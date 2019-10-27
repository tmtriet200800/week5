import React from "react";
import moment from 'moment';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Icon } from "react-native";
import { Card, Button } from 'react-native-elements';

export default class Item extends React.PureComponent{
    render(){
        return(
            <Card title={this.props.item.title} image = {{uri: this.props.item.urlToImage}}>
      <View style={styles.row}>
        <Text style={styles.label}>Source</Text>
        <Text style={styles.info}>{this.props.item.source.name}</Text>
      </View>
      <Text>{this.props.item.content}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Published</Text>
        <Text style={styles.info}>
          {moment(this.props.item.publishedAt).format('LLL')}
        </Text>
      </View>
      <Button onPress = {() => this.props.onPress()}  title="Read more" backgroundColor="#03A9F4" />
    </Card>
        );
    }
}

const styles = StyleSheet.create({

    header: {
      height: 30,
      width: '100%',
      backgroundColor: 'pink'
    },
    row: {
      flexDirection: 'row'
    },
    label: {
      fontSize: 16,
      color: 'black',
      marginRight: 10,
      fontWeight: 'bold'
    },
    info: {
      fontSize: 16,
      color: 'grey'
    }
  });
  