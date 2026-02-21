import React from 'react'

export interface HyperspeedProps {
  effectOptions?: Partial<{
    onSpeedUp: () => void
    onSlowDown: () => void
    distortion: string
    length: number
    roadWidth: number
    islandWidth: number
    lanesPerRoad: number
    fov: number
    fovSpeedUp: number
    speedUp: number
    carLightsFade: number
    totalSideLightSticks: number
    lightPairsPerRoadWay: number
    shoulderLinesWidthPercentage: number
    brokenLinesWidthPercentage: number
    brokenLinesLengthPercentage: number
    lightStickWidth: [number, number]
    lightStickHeight: [number, number]
    movingAwaySpeed: [number, number]
    movingCloserSpeed: [number, number]
    carLightsLength: [number, number]
    carLightsRadius: [number, number]
    carWidthPercentage: [number, number]
    carShiftX: [number, number]
    carFloorSeparation: [number, number]
    colors: Partial<{
      roadColor: number
      islandColor: number
      background: number
      shoulderLines: number
      brokenLines: number
      leftCars: number[]
      rightCars: number[]
      sticks: number
    }>
  }>
}

declare const Hyperspeed: React.FC<HyperspeedProps>
export default Hyperspeed

