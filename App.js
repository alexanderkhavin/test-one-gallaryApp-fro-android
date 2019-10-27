import React from 'react';
import { StyleSheet, 
  Text, 
  Modal, 
  TouchableOpacity, 
  Image, 
  View, 
  ActivityIndicator, 
  ScrollView } from 'react-native';


export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading:true,
      dataImages: [],
    }
  }


  componentDidMount() {

    return fetch('https://pixabay.com/api/?key=14049793-1029517555a4d85c5b1679eee&')
      .then( (response) => response.json() )
      .then( (responseJson) => {
        this.setState({
          isLoading:false,
          dataImages: responseJson.hits,
        })
      })

      .catch((error) => {
        console.log(error)
      });
  }

  state = {
    isVisible: false,
  }
  
  UnshowImage = () => {
    this.setState({isVisible: false});
  }


  ModelImageFunction(url){
    this.setState({isVisible: true});
    imageKey = url;
  }

  render() {
    
    
    if (this.state.isLoading) {
      return (
        <View style={{justifyContent:'center', flex: 1}}>
          <ActivityIndicator size="large" color="#ccc" />
        </View>
      )
    }

    let images = this.state.dataImages.map((image, key) => {
      return <View key={key}>
                <TouchableOpacity onPress={() => this.ModelImageFunction(image.webformatURL)}>
                  <View>
                    <Image style={{width: 200, height: 200, marginBottom: 5}} source={{uri: image.webformatURL}} />
                  </View>
                </TouchableOpacity>
              </View>        
      });

    return (
      <View>
        {this.state.isVisible ? 
          <Modal>
            <View style={styles.modal}>
              <Text style={styles.text} onPress={this.UnshowImage}>close</Text>
              <Image style={{width: 450, height: 500}} source={{uri: imageKey}} />
            </View>
          </Modal>
        : null}
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.containerOne}>
              {images}
            </View>
            <View style={styles.containerTwo}>
              {images}
            </View>
          </View>
        </ScrollView> 
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    marginLeft:4,
    marginTop: 30,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  containerOne: {
    flex: 2,
  },

  containerTwo:{
    flex: 2,
  },

  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  text: {
    fontSize: 30, 
    color: '#fff', 
    marginBottom: 5, 
    marginLeft: 10,
  },
});
