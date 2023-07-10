// import { PermissionsAndroid, Alert } from 'react-native'

import { PermissionsAndroid } from "react-native";
import { GestureObjects } from "react-native-gesture-handler/lib/typescript/handlers/gestures/gestureObjects";
import GetLocation, { Location } from "react-native-get-location";

// export async function checkLocationPermission() {
//     let granted = await getLocationPermission()
//     console.log(granted, '=> Permission')
//     return granted
// }

// export async function getLocationPermission() {

//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         ).catch(err=> {
//             console.warn(err)
//         })
//         // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         //     console.log("You can use the location")
//         //     return granted

//         // } else {
//         //     console.log("location permission denied")
//         // }
//         return granted === PermissionsAndroid.RESULTS.GRANTED

// }

//--------------------------------------------------
// import { Button, PermissionsAndroid, Alert } from 'react-native';
// import GetLocation, { Location } from 'react-native-get-location';

// export const requestLocationPermission = async (): Promise<void> => {
//     try {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//             {
//                 title: 'Location Permission',
//                 message: 'This app requires access to your location.',
//                 buttonPositive: 'Allow',
//                 buttonNegative: 'Deny',
//             },
//         );

//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('Location permission granted');
//             getUserLocation();
//         } else {
//             console.log('Location permission denied');
//         }
//     } catch (error) {
//         console.log('Error:', error);
//     }
// };

// export const checkLocationPermission = async (): Promise<void> => {
//     try {
//         const granted = await PermissionsAndroid.check(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         );

//         if (!granted) {
//             showLocationPermissionAlert();
//         }
//     } catch (error) {
//         console.log('Error:', error);
//     }
// };

// export const showLocationPermissionAlert = (): void => {
//     Alert.alert(
//         'Location Permission',
//         'This app requires access to your location.',
//         [
//             {
//                 text: 'Deny',
//                 onPress: () => console.log('Location permission denied'),
//                 style: 'cancel',
//             },
//             {
//                 text: 'Allow',
//                 onPress: () => requestLocationPermission(),
//             },
//         ],
//         { cancelable: false },
//     );
// };

// export const getUserLocation = (): Promise<{ latitude: number; longitude: number }> => {
//     return new Promise((resolve, reject) => {
//         GetLocation.getCurrentPosition({
//             enableHighAccuracy: true,
//             timeout: 15000,
//         })
//             .then((location: Location) => {
//                 const { latitude, longitude } = location;
//                 console.log('Latitude:', latitude);
//                 console.log('Longitude:', longitude);
//                 resolve({ latitude, longitude }); // Değerleri resolve ederek dışarı aktar
//             })
//             .catch((error: any) => {
//                 console.log('Error:', error);
//                 reject(error); // Hata durumunda reject ile hata ilet
//             });
//     });
// };

const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Geolocation Permission',
                message: 'Can we access your location?',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        console.log('granted', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use Geolocation');
            return granted;
        } else {
            console.log('You cannot use Geolocation');
            return granted;
        }
    } catch (err) {
        return false;
    }
};
export const getUserLocation = async (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise(async (resolve, reject) => {
        const hasPermission = await requestLocationPermission();
        if (hasPermission) {
            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 0,
            })
                .then((location: Location) => {
                    const { latitude, longitude } = location;
                    console.log('Latitude:', latitude);
                    console.log('Longitude:', longitude);
                    // setLocation(location); // Set the location state with the retrieved values
                    resolve({ latitude, longitude });
                })
                .catch((error: any) => {
                    console.log('Error:', error);
                    reject(error); // Hata durumunda reject ile hata ilet
                });
        }
    })

}; 
