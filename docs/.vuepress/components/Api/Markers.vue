<template>
    <WCartesian
        :dataset="data"
        :gap="10"
        responsive
    >
        <WMarker
            :x="'Page C'"
            :styles="{
                stroke: '#333',
                strokeWidth: 1,
                strokeDasharray: 0,
            }"
            :labelStyles="{
                fill: '#333',
                fontSize: 14
            }"
            label="Marker X"
            labelAlign="end"
        />
        <WMarker
            :x="['Page C', 'Page E']"
            :y="[1500, 2700]"
            :borderSpacing="[0, 0.5, 0, 0.5]"
            #default="{ x, y, width, height, styles }"
        >
            <g :transform="'translate('+x+', '+y+')'">
                <rect
                    :x="0"
                    :y="0"
                    :width="width"
                    :height="height"
                    stroke="rgba(255, 150, 150, 1)"
                    stroke-width="2"
                    fill="rgba(255, 150, 150, 0.2)"
                    rx="40"
                    ry="40"
                />
                <text
                    :x="0"
                    :y="0"
                    fill="rgba(255, 150, 150, 1)"
                    text-anchor="middle"
                    :transform="'translate('+(width / 2)+', '+(height / 2)+') rotate(-20)'"
                >
                    This is my marker!
                </text>
            </g>
        </WMarker>
        <WMarker
            :y="1500"
            :styles="{
                stroke: '#33f',
                strokeWidth: 1,
                strokeDasharray: 0,
            }"
            :labelStyles="{
                fill: '#33f',
                fontSize: 14
            }"
            label="Marker Y"
            labelAlign="end"
        />
        <WLine
            datakey="one"
            :styles="{stroke: '#ddd'}"
        />
        <WXAxis
            datakey="name"
            :axisStyles="{stroke: '#ddd'}"
            :markStyles="{stroke: '#ddd'}"
            :tickStyles="{fill: '#ddd'}"
        />
        <WYAxis
            :axisStyles="{stroke: '#ddd'}"
            :markStyles="{stroke: '#ddd'}"
            :tickStyles="{fill: '#ddd'}"
        />
    </WCartesian>
</template>

<script>
import { chart as data } from '../data'
import colors from '../../colors'

export default {
    name: 'Markers',
    data () {
        return {
            data,
            colors
        }
    }
}
</script>