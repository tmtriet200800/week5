import React from "react";
import moment from "moment";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Icon,
  Linking
} from "react-native";
import {SearchBar } from "react-native-elements";

import Item from "./Item";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      pageNumber: 0,
      loadingMore: true,
      error: false, 
      search: ''
    };
    this.dataForFilter =[]
  }

  searchFilterFunction = text => {    
    const newData = this.dataForFilter.filter(item => {
      let title = item.title.toLowerCase()
      if(title.includes(text.toLowerCase())){
        return true;
      }
      return false;
    })
    
    this.setState({ 
      data: newData,
      search: text,
    });  
  };
  
  renderHeader = () => {    
    return (      
      <SearchBar        
        placeholder="Type Here..."        
        lightTheme        
        round        
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false} 
        value = {this.state.search}            
      />    
    );  
  };

  getNews = async () => {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=f79d8cabb4a1425aa500abcb2b290f03&page=" +
          this.state.pageNumber
      );
      jsonData = await response.json();
      addData = this.state.data;
      addData = filterForUniqueArticles(addData.concat(jsonData.articles));
      this.dataForFilter = addData
      this.setState({
        loading: false,
        data: addData,
        pageNumber: this.state.pageNumber + 1
      });
    } catch (error) {
      this.setState({
        error: true
      });
    }
  };
  componentDidMount() {
    this.getNews();
    console.log('componentDidMount','call')
  }

  render() {
    return this.state.error == true ? (
      <View style={styles.container}>
        <Text>Error</Text>
      </View>
    ) :(this.state.loading == true ? (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Articles count: {this.state.data.length}
        </Text>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <Item item={item} onPress={() => onPressButton(item.url)} />
          )}
          keyExtractor={item => item.title}
          onEndReached={() => this.getNews()}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            <ActivityIndicator size="large" animating={false} />
          }
          ListHeaderComponent ={this.renderHeader}
        ></FlatList>
      </View>
    )
    );  
  }
}

const filterForUniqueArticles = arr => {
  const cleaned = [];
  arr.forEach(itm => {
    let unique = true;
    cleaned.forEach(itm2 => {
      const isEqual = JSON.stringify(itm) === JSON.stringify(itm2);
      if (isEqual) unique = false;
    });
    if (unique) cleaned.push(itm);
  });
  return cleaned;
};


const onPressButton = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Don't know how to open URL: ${url}");
    }
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});
