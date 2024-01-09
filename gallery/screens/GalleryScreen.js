import React, { useEffect, useState } from 'react'
import { Text,StyleSheet , View,Image, FlatList, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

export  function GalleryScreen({navigation}) {

    const [Data, setData] = useState([]);
    const [oldData, setOldData] = useState([]);
    const isFocused = useIsFocused();
    const getData = async() =>{
        try {
        const response = await fetch('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s');

            const json = await response.json();
            //console.log(json.photos.photo);
            const recData = json.photos.photo;
            const images = [];
            recData.map((item,index) => (

                images.push(item.url_s)
            ))

            console.log("images:",images);
            setData(images);
            if(Data!=oldData && Data!=[]){
                setAsyncStorage(images);
            }
            
          } catch (error) {
            console.error(error);
          }
    }

    const setAsyncStorage = async(images) =>{

        console.log("setAsync: enter", images);
        await AsyncStorage.setItem('Images',JSON.stringify(images));

        // getAsyncStorage();
    }

    const getAsyncStorage = async() => {
        
        const fetchedImages = await AsyncStorage.getItem('Images');
        const parsedImages = JSON.parse(fetchedImages);
        console.log("getAsync : ",parsedImages);
        setOldData(parsedImages);
    }
    useFocusEffect(
        React.useCallback(() => {
        getAsyncStorage();
        getData();
      }, []));

  return (
    <View>
        {isFocused? ()=>getData() : null}
        
        <FlatList

            horizontal={false}
            numColumns={3}
            data={Data==oldData?oldData:Data}
            renderItem={({item}) =>{

            return( 
                <TouchableOpacity onPress={() => navigation.navigate('Home',{screen:'Image',params:{image:item}})}>
                    
                    <Image source={{uri:item}}  style={styles.image}/>
                </TouchableOpacity>
            )
            }}
        />
    </View>
  )
}

const styles = StyleSheet.create({

    image:{

        margin:2,
        height:118,
        width:118
    }
})