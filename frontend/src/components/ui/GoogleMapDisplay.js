import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo } from 'react';
import { GOOGLE_MAP_API_KEY } from "../../constants";
import "../../index.css"

const GoogleMapDisplay = (props) => {

  // Need to dynamically render map with park lat and long in props
  /* props: {
    parkLatitude: decimal,
    parkLongitude: decimal
  }
  */
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: GOOGLE_MAP_API_KEY,
        });

        const center = useMemo(() => 
          ({lat: parseFloat(props.parkLatitude), lng: parseFloat(props.parkLongitude)}),
          [props.parkLatitude, props.parkLongitude]);


   
      return (
        <div className="flex w-full">
        {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={13}
        >
        <MarkerF position={center}></MarkerF>
        </GoogleMap>
      )}
        </div>
      )
};

export default GoogleMapDisplay;