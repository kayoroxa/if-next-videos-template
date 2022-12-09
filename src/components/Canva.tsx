import { useOnDraw } from '../hooks/useOnDraw'

interface Props {
  width: number
  height: number
}

const Canvas = ({ width, height }: Props) => {
  const { setCanvasRef, onCanvasMouseDown } = useOnDraw(onDraw)

  function onDraw(ctx: any, point: any, prevPoint: any) {
    drawLine(prevPoint, point, ctx, '#089af5', 5)
  }

  function drawLine(start: any, end: any, ctx: any, color: any, width: number) {
    start = start ?? end
    ctx.beginPath()
    ctx.lineWidth = width
    ctx.strokeStyle = color
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.stroke()

    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI)
    ctx.fill()
  }

  return (
    <canvas
      className="absolute"
      width={width}
      height={height}
      onMouseDown={onCanvasMouseDown}
      style={canvasStyle}
      ref={setCanvasRef}
    />
  )
}

export default Canvas

const canvasStyle = {
  border: '1px solid black',
}
