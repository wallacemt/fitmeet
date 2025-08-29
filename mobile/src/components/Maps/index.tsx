import {ActivityIndicator, PermissionsAndroid, Text, View} from 'react-native';

import {useEffect, useState} from 'react';

import Geolocation from '@react-native-community/geolocation';
import MapView, {LatLng, Marker} from 'react-native-maps';
import {styles} from './styles';

interface MapProps {
  onLocationChange?: (latitude: number, longitude: number) => void;
  locationPoint?: {
    latitude: number;
    longitude: number;
  };
  size?: number;
}

export default function Maps({
  onLocationChange,
  locationPoint,
  size = 230,
}: MapProps) {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [corrdinates, setCorrdinates] = useState<LatLng>();
  const [address, setAddress] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  async function getPermission() {
    const hasPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return hasPermission === PermissionsAndroid.RESULTS.GRANTED;
  }

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
      },
    );
  };
 
  useEffect(() => {
    if (!locationPoint) {
      getLocation();
    }
  }, [locationPoint]);
  const initialLatitude = locationPoint ? locationPoint.latitude : latitude;
  const initialLongitude = locationPoint ? locationPoint.longitude : longitude;

  
  return (
    <View style={[styles.container, {height: size}]}>
      {initialLatitude && initialLongitude ? (
        <MapView
          onMapReady={getPermission}
          style={styles.map}
          initialRegion={{
            latitude: initialLatitude,
            longitude: initialLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider="google"
          showsUserLocation={true}
          zoomEnabled={true}
          minZoomLevel={17}
          loadingEnabled={true}
          onLongPress={(e: any) => {
            if (!locationPoint) {
              setCorrdinates(e.nativeEvent.coordinate);
              setLatitude(e.nativeEvent.coordinate.latitude);
              setLongitude(e.nativeEvent.coordinate.longitude);
              onLocationChange &&
                onLocationChange(
                  e.nativeEvent.coordinate.latitude,
                  e.nativeEvent.coordinate.longitude,
                );
            }
          }}>
          {(corrdinates || locationPoint) && (
            <Marker
              draggable={true}
              coordinate={
                corrdinates || {
                  latitude: initialLatitude,
                  longitude: initialLongitude,
                }
              }
              onDragEnd={(e: any) => {
                setLatitude(e.nativeEvent.coordinate.latitude);
                setLongitude(e.nativeEvent.coordinate.longitude);
                onLocationChange &&
                  onLocationChange(
                    e.nativeEvent.coordinate.latitude,
                    e.nativeEvent.coordinate.longitude,
                  );
              }}
              title={"Esse e o local de encontro"}
              description={`A atividade será realizada nesse local.`}
            />
          )}
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#121212" />
      )}
    </View>
  );
}
