import React, { Component } from 'react';
import { FlatGrid } from 'react-native-super-grid';
import { StyleSheet, ImageBackground, FlatList, View, Text, TouchableOpacity, Image,
  Alert,
  ScrollView,
  Dimensions, } from 'react-native';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, title: "Permainan Lokal",   label: DashboardLabels.labels.START,   color:"#fff", members:8,  image:"http://www.lazytweet.com/wp-content/uploads/ph/photostock-vector-gamer-holding-gamepad-in-hand-vector-illustration-flat-design-isolated-on-white-background-man-playi.jpg"},
        {id:2, title: "Latihan Bersama",  label: DashboardLabels.labels.ACHIEVEMENTS,  color:"#4682B4", members:6,  image:"https://sinsetoto.com/wp-content/uploads/2018/08/dcbf3dd83297bc1f0a57ac45fdbb024d.jpg"},
        {id:3, title: "Peringkat Teman", label: DashboardLabels.labels.CHALLENGE,    color:"#4682B4", members:12, image:"https://previews.123rf.com/images/asantosg/asantosg1611/asantosg161100071/65808788-character-from-indonesia-dressed-in-the-traditional-way-illustration.jpg"} ,
        {id:4, title: "Kisi-Kisi Uji Materi ", label: DashboardLabels.labels.RANKING,  color:"#4682B4", members:5,  image:"https://previews.123rf.com/images/missbobbit/missbobbit1505/missbobbit150500201/40239672-indonesia-icon-set.jpg"} ,
        {id:5, title: "Peringkat  Lokal ", label: DashboardLabels.labels.SETTINGS, color:"#4682B4", members:6,  image:"https://cdn.dribbble.com/users/1241550/screenshots/5301375/talking_2x.jpg"} ,
        {id:6, title: "Perolehan Seluruh Nilai", label: DashboardLabels.labels.PROFILE,  color:"#4682B4", members:7,  image:"https://previews.123rf.com/images/tovovan/tovovan1311/tovovan131100094/23816444-different-objects-on-book-shelves-flat-design-elements.jpg"} ,
        {id:7, title: "Tentang Indonesia", label: DashboardLabels.labels.FRIENDS,  color:"#4682B4", members:8,  image:"https://previews.123rf.com/images/butenkow/butenkow1802/butenkow180206935/96237142-indonesia-flag-vector-illustration.jpg"} ,
        {id:8, title: "Dunia Mengenal Indonesia", label: DashboardLabels.labels.DISCONNECT,   color:"#4682B4", members:23, image:"https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/3501765/1360/906/m1/fpnw/wm1/khifytyxrsxgzgdt9fk44pussuu48qw1pcxsd9ux83wfitufishq782ig8qmoqdz-.jpg?1509450635&s=ec6ae8fe34c4df73e60c2dbfe83dd76e"} ,
      
      ]
    };
  }

  clickEventListener(item) {
    Alert.Alert(item.label)
  }

  render() {
    return (
      <FlatList style={styles.list}
      contentContainerStyle={styles.listContainer}
      data={this.state.data}
      horizontal={false}
      numColumns={2}
      keyExtractor= {(item) => {
        return item.id;
      }}
      renderItem={({item}) => {
        
        return (  
              <View style={styles.list}>
              <TouchableOpacity style={[styles.card, ]} onPress={() => {this.clickEventListener(item.label)}} >
                <View style={styles.cardHeader}>
                <Text style={styles.title}></Text>
                  <Image style={styles.icon} source={{uri:"https://image.flaticon.com/icons/png/128/148/148767.png"}}/>
                </View>
                <Image style={styles.cardImage} source={{uri:item.image}}/>
                <View style={styles.cardFooter}>
                  
                </View>
              </TouchableOpacity>
              </View>
            
            )
          }}/>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    //paddingHorizontal: 5,
    backgroundColor:"#dcdcdc",
  },
  listContainer:{
    alignItems:'center'
  },
  /******** card **************/
  headerStyle: {
    backgroundColor: '#000066',
  },

  card:{
    marginHorizontal:12,
    marginVertical:5,
    flexBasis: '42%',
    borderRadius: 10,
    shadowRadius: 12,
    shadowOpacity: 5,
    backgroundColor: '#fff',
  },
  cardHeader: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center",
    backgroundColor: 'orange',
    shadowOpacity: 5,
  },
  cardContent: {
   
  },
  cardFooter:{
    
  },
  cardImage:{
    height: 151,
    width: 151,
    alignItems:'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title:{
    fontSize:16,
    flex:1,
    color:"#FFFFFF",
    fontWeight:'bold'
  },
  subTitle:{
    fontSize:12,
    flex:1,
    color:"#FFFFFF",
  },
  icon:{
    height: 20,
    width: 20, 
  }
});
