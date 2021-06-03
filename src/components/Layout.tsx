import React, { useEffect, useRef, useState } from 'react'
import { Container, Col, Row } from '@qonsoll/react-design'
import { SizeForm, ListPoint } from './index'
import { Typography } from '@material-ui/core'
import * as d3 from 'd3'
import UserIcon from '../assets/user-icon.ico'
import NoiceSourceIcon from '../assets/noice-source.ico'
import { useStore } from '../context'
const { useForm } = require('mui-form-generator-fractal-band-2')

interface Nodes {
  x: number
  y: number
  name?: string
  icon?: string
  isUser: boolean
}
// interface Links {
//   source: number
//   target: number
// }

const userNode: Nodes = {
  x: 300,
  y: 300,
  name: 'Person',
  icon: UserIcon,
  isUser: true
}

const Layout: React.FC<Record<string, unknown>> = ({}) => {
  const form = useForm()
  const d3ChartRef = useRef<HTMLDivElement>(null)
  const { points, areaWidth, areaHeight } = useStore()
  console.log('points:', points)

  const onSubmit = (data: any): void => {
    console.log(data)
    form.reset({})
  }

  useEffect(() => {
    let isComponentMounted = true

    if (isComponentMounted) {
      const nodes = [
        userNode,
        ...points.map((point: any) => ({
          x: point.x,
          y: point.y,
          name: point.name,
          icon: NoiceSourceIcon,
          isUser: false
        }))
      ]
      const linksData = nodes
        .map((node, index) => ({
          source: index,
          target: 0
        }))
        .slice(1) // to remove self-targeting first element

      linksData.forEach(function (d: any) {
        d.source = nodes[d.source]
        d.target = nodes[d.target]
      })

      // removing of old svg on update
      d3.selectAll('svg').remove()

      // painting of new svg with it's content (children)
      const svg = d3
        .select(d3ChartRef.current)
        .append('svg')
        .attr('viewBox', `0 0 ${areaWidth} ${areaHeight}`)
        .attr('overflow', 'visible')

      // links container (for all elements)
      const linksSelection = svg
        .append('g')
        .attr('class', 'links')
        .style('stroke', '#999')
        .selectAll('line')
        .data(linksData)
        .enter()
        .append('g')
        .attr('class', 'line')

      // links
      const links = linksSelection
        .append('line')
        .attr('x1', function (d: any) {
          return d.source.x
        })
        .attr('y1', function (d: any) {
          return d.source.y
        })
        .attr('x2', function (d: any) {
          return d.target.x
        })
        .attr('y2', function (d: any) {
          return d.target.y
        })

      // text to the lines
      const linkTexts = linksSelection
        .append('text')
        .attr('transform', function (d: any) {
          const midpointX = (d.target.x + d.source.x) / 2
          const midpointY = (d.target.y + d.source.y) / 2

          return `translate(${midpointX},${midpointY})`
        })
        .attr('pointer-events', 'none')
        .attr('font', '6px sans-serif')
        .text(function (d: any) {
          const dx = d.target.x - d.source.x
          const dy = d.target.y - d.source.y
          const distanceInPixels = Math.sqrt(dx * dx + dy * dy)

          return Math.round((Number.EPSILON + distanceInPixels) * 100) / 100
        })

      // container for the nodes (images with text)
      const nodesSelector = svg
        .append('g')
        .attr('class', 'nodes')
        .selectAll('g')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', function (d: any) {
          return `translate(${d.x},${d.y})`
        })
        .attr('cx', function (d: any) {
          return d.x
        })
        .attr('cy', function (d: any) {
          return d.y
        })

      // node images
      nodesSelector
        .append('image')
        .attr('xlink:href', function (d: any) {
          return d.icon || ''
        })
        .attr('x', -8)
        .attr('y', -8)
        .attr('width', 16)
        .attr('height', 16)

      // node texts
      nodesSelector
        .append('text')
        .attr('dx', 12)
        .attr('dy', '.35em')
        .attr('pointer-events', 'none')
        .attr('font', '10px sans-serif')
        .text(function (d: any) {
          return (d && d.name) || ''
        })

      // drag&drop function
      svg.selectAll('.node').call(
        d3.drag<any, any, SVGLineElement>().on('drag', function (event, d) {
          // const svgElement = svg.node()
          // const svgBoundingClientRect = svgElement?.getBoundingClientRect()

          // border limits
          const XAxisMin = 0
          const YAxisMin = 0
          const XAxisMax = areaWidth
          const YAxisMax = areaHeight
          // const XAxisMax = svgBoundingClientRect?.width || areaWidth
          // const YAxisMax = svgBoundingClientRect?.height || areaHeight
          const padding = {
            top: 8,
            bottom: 8,
            left: 8,
            right: 8
          }

          const newX = event.x
          const newY = event.y

          const isNewXPointPossibleToPlace =
            newX > XAxisMin + padding.left && newX < XAxisMax - padding.right
          const isNewYPointPossibleToPlace =
            newY > YAxisMin + padding.top && newY < YAxisMax - padding.bottom

          // checks for borders&limits (wether drag&drop possible)
          if (isNewXPointPossibleToPlace || isNewYPointPossibleToPlace) {
            const currentTransformTranslateString = d3
              .select(this)
              .attr('transform')
            const transformTranslateStringValueFormatted = currentTransformTranslateString
              .replace('translate(', '')
              .replace(')', '')
            const [oldX, oldY] = transformTranslateStringValueFormatted.split(
              ', '
            )
            let newXValueForTransformTranslateComputed = oldX
            let newYValueForTransformTranslateComputed = oldY

            // D&D for links
            const sourceLinks = links.filter(function (l: any) {
              return l.source === d
            })
            const targetLinks = links.filter(function (l: any) {
              return l.target === d
            })

            if (isNewXPointPossibleToPlace) {
              d.x = newX

              sourceLinks.attr('x1', newX)
              targetLinks.attr('x2', newX)

              newXValueForTransformTranslateComputed = newX
            }
            if (isNewYPointPossibleToPlace) {
              d.y = newY

              sourceLinks.attr('y1', newY)
              targetLinks.attr('y2', newY)

              newYValueForTransformTranslateComputed = newY
            }

            d3.select(this).attr(
              'transform',
              `translate(${newXValueForTransformTranslateComputed}, ${newYValueForTransformTranslateComputed})`
            )

            // D&D for link texts
            linkTexts
              .filter(function (l: any) {
                return l.source === d
              })
              .attr('transform', function (d: any) {
                const midpointX = (d.target.x + d.source.x) / 2
                const midpointY = (d.target.y + d.source.y) / 2

                return `translate(${midpointX},${midpointY})`
              })
              .text(function (d: any) {
                const dx = d.target.x - d.source.x
                const dy = d.target.y - d.source.y
                const distanceInPixels = Math.sqrt(dx * dx + dy * dy)

                return (
                  Math.round((Number.EPSILON + distanceInPixels) * 100) / 100
                )
              })
          }
        })
      )
    }
    return () => {
      isComponentMounted = false
    }
  }, [points])

  return (
    <Container>
      <Row>
        <Col cw={7}>
          <div
            ref={d3ChartRef}
            style={{ backgroundColor: 'white', border: '1px solid red' }}
          />
        </Col>
        <Col cw={5}>
          <Row v={'center'} h={'center'} noInnerGutters>
            <Col>
              <Row h="center">
                <Col cw={'auto'}>
                  <Typography>{'Введіть розмір кімнати:'}</Typography>
                </Col>
              </Row>
              <SizeForm
                form={form}
                onSubmit={onSubmit}
                show={['height', 'width']}
                buttonProps={{ visibleCancel: false }}
              />
            </Col>
          </Row>
          <Row v={'center'} h={'center'} noInnerGutters>
            <Col>
              <ListPoint />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
export default Layout
