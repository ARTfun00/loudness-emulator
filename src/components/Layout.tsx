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
interface Links {
  source: number
  target: number
}

const userNode: Nodes = {
  x: 300,
  y: 250,
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
      const links = nodes.map((node, index) => ({
        source: index,
        target: 0
      }))

      links.forEach(function (d: any) {
        d.source = nodes[d.source]
        d.target = nodes[d.target]
      })

      // removing of old svg
      d3.selectAll('svg').remove()

      // painting of new svg with it's content (children)
      const svg = d3
        .select(d3ChartRef.current)
        .append('svg')
        .attr('width', areaWidth)
        .attr('height', areaHeight)

      const link = svg
        .append('g')
        .attr('class', 'link')
        .style('stroke', '#999')
        .selectAll('line')
        .data(links)
        .enter()
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

      svg
        .append('g')
        .attr('class', 'nodes')
        .selectAll('g')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')'
        })
        // .append('circle')
        // .attr('r', 8)
        .attr('cx', function (d: any) {
          return d.x
        })
        .attr('cy', function (d: any) {
          return d.y
        })

      const nodesSelector = svg.selectAll('.node')

      nodesSelector
        .append('image')
        .attr('xlink:href', function (d: any) {
          return d.icon || ''
        })
        .attr('x', -8)
        .attr('y', -8)
        .attr('width', 16)
        .attr('height', 16)

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
          const newX = event.x
          const newY = event.y

          d.x = newX
          d.y = newY

          d3.select(this)
            // .attr('cx', ())
            // .attr('cy', ())
            .attr('transform', `translate(${(d.x = newX)}, ${(d.y = newY)})`)

          link
            .filter(function (l: any) {
              return l.source === d
            })
            .attr('x1', newX)
            .attr('y1', newY)
          link
            .filter(function (l: any) {
              return l.target === d
            })
            .attr('x2', newX)
            .attr('y2', newY)
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
        <Col>
          <Row>
            <Col cw={7} border="1px solid red">
              <div ref={d3ChartRef} style={{ backgroundColor: 'white' }} />
            </Col>
            <Col cw={5}>
              <Row v={'center'} h={'center'} noInnerGutters>
                <Col>
                  <Row h="center">
                    <Col cw={'auto'}>
                      <Typography>Enter room size</Typography>
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
        </Col>
      </Row>
    </Container>
  )
}
export default Layout
