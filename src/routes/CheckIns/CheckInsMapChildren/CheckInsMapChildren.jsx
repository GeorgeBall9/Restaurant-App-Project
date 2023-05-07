import "./CheckInsMapChildren.css";
import {FullscreenControl} from "react-map-gl";
import {Popup} from "react-map-gl";
import RestaurantMarker from "../../../common/components/RestaurantMarker/RestaurantMarker";
import {useSelector} from "react-redux";
import {selectCheckInsRouteCoordinates, selectSelectedCheckIns} from "../../../features/checkIns/checkInsSlice";
import {useEffect} from "react";
import Route from "../../../common/components/Route/Route";

const CheckInsMapChildren = ({checkIns, displayedRestaurant}) => {

    return (
        <>
            {checkIns && checkIns.map(({id, restaurant}) => {
                const {id: restaurantId, longitude, latitude, name} = restaurant;

                return (
                    <div key={id}>
                        <RestaurantMarker
                            restaurant={{...restaurant, checkInId: id}}
                            visible={true}
                            type="check-in"
                            selected={displayedRestaurant.id === restaurantId}
                        />

                        {displayedRestaurant?.id === restaurantId && (
                            <Popup
                                longitude={longitude}
                                latitude={latitude}
                                anchor="bottom"
                                closeButton={false}
                                closeOnClick={false}
                                offset={60}
                                className="check-ins-map-popup"
                            >
                                <div className="content">
                                    <h3>{name}</h3>
                                </div>
                            </Popup>
                        )}
                    </div>
                );
            })}

            <FullscreenControl position="bottom-right"/>
        </>
    );
};

export default CheckInsMapChildren;