import React, { useEffect, useRef, useState } from 'react'
import { Container, Col, Row } from '@qonsoll/react-design'
import { SizeForm, ListPoint } from './index'
import { Typography } from '@material-ui/core'
import * as d3 from 'd3'

const jsonGraph = {
  nodes: [
    {
      x: 135,
      y: 275
    },
    {
      x: 69,
      y: 324
    },
    {
      x: 169,
      y: 278
    },
    {
      x: 162,
      y: 256
    },
    {
      x: 73,
      y: 269
    }
  ],
  links: [
    {
      source: 0,
      target: 2
    },
    {
      source: 1,
      target: 2
    },
    {
      source: 2,
      target: 0
    },
    {
      source: 3,
      target: 2
    },
    {
      source: 4,
      target: 2
    }
  ]
}

// const d3 = require('d3')
const { useForm } = require('mui-form-generator-fractal-band-2')

const Layout: React.FC<Record<string, unknown>> = ({}) => {
  const form = useForm()
  const d3ChartRef = useRef<HTMLDivElement>(null)

  const [state, setState] = useState()

  const onSubmit = (data: any): void => {
    console.log(data)
    form.reset({})
  }

  useEffect(() => {
    let isComponentMounted = true

    // if (isComponentMounted) {
    const width = 500
    const height = 500

    jsonGraph.links.forEach(function (d: any) {
      // console.log('==>', jsonGraph.nodes[d.source])
      d.source = jsonGraph.nodes[d.source]
      d.target = jsonGraph.nodes[d.target]
    })
    console.log('data:', jsonGraph)

    const svg = d3
      .select(d3ChartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const link = svg
      .append('g')
      .attr('class', 'link')
      .style('stroke', '#999')
      .selectAll('line')
      .data([...jsonGraph.links])
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

    const node = svg
      .append('g')
      .attr('class', 'node')
      .style('stroke', '#fff')
      .style('stroke-width', '1.5px')
      .selectAll('circle')
      .data([...jsonGraph.nodes])
      .enter()
      .append('circle')
      .attr('r', 8)
      .attr('cx', function (d: any) {
        return d.x
      })
      .attr('cy', function (d: any) {
        return d.y
      })

    svg.selectAll('circle').call(
      d3.drag<any, any, SVGLineElement>().on('drag', function (event, d) {
        const newX = event.x
        const newY = event.y

        d.x = newX
        d.y = newY

        d3.select(this)
          .attr('cx', (d.x = newX))
          .attr('cy', (d.y = newY))

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

    return () => {
      isComponentMounted = false
    }
  }, [])

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
