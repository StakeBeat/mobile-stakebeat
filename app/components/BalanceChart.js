import React, { Component } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-elements'
import { LineChart } from "react-native-chart-kit"
import { Dimensions } from "react-native";

import {theme} from '../core/theme'
import { maxAppWidth } from '../core/size'

class BalanceChart extends Component {
  render() {
    return (
      <View>
        <LineChart
          data={{
            labels: this.props.labels,
            datasets: [
              {
                data: this.props.data
              }
            ]
          }}
          width={maxAppWidth} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: theme.colors.primary,
            backgroundGradientFrom: "#273C5E",
            backgroundGradientFromOpacity: 0.0,
            backgroundGradientTo: "#325995",
            backgroundGradientToOpacity: 0.0,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 0,
            },
            propsForDots: {
              r: "3",
              strokeWidth: "1",
              stroke: "#ffa726"
            }
          }}
          withInnerLines={false}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    )
  }
}


export default BalanceChart
