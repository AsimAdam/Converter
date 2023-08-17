import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import WebView from 'react-native-webview';

const ChartScreen = ({navigation, route}: any) => {
    const { url, nav } = route?.params;
    const htmlContent = `
    <!-- TradingView Widget BEGIN -->
    <div class="tradingview-widget-container">
      <div id="tradingview_8b07d"></div>
      <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>
      <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      <script type="text/javascript">
      new TradingView.widget(
      {
      "autosize": true,
      "symbol": "FX_IDC:${url}",
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "light",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "container_id": "tradingview_8b07d"
    }
      );
      </script>
    </div>
    <!-- TradingView Widget END -->
    `;
    return(
        <View style={styles.container}>
            {nav &&
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/back.png')} style={styles.icon} />
                </TouchableOpacity>
            }
            <WebView source={nav ? {html: htmlContent} : {uri: url}} />
        </View>
    )
};

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "black"
    },
    icon: {
        width: 30,
        height: 30,
        marginBottom: 10
    },
});

export default ChartScreen;