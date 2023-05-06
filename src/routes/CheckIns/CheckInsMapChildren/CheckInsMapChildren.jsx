import "./CheckInsMapChildren.css";
import {FullscreenControl} from "react-map-gl";
import {Popup} from "react-map-gl";
import RestaurantMarker from "../../../features/map/Map/RestaurantMarker/RestaurantMarker";

const CheckInsMapChildren = ({checkIns, displayedRestaurant}) => {

    // component returned to MapPage route
    return (
        <>
            {checkIns && checkIns.map(({id, restaurant}) => {
                const {id: restaurantId, longitude, latitude, name} = restaurant;

                return (
                    <div key={id}>
                        <RestaurantMarker
                            restaurant={{...restaurant, checkInId: id}}
                            visible={true}
                            type="check-ins"
                        />

                        {displayedRestaurant?.id === restaurantId && (
                            <Popup
                                longitude={longitude}
                                latitude={latitude}
                                anchor="bottom"
                                closeButton={false}
                                closeOnClick={false}
                                offset={45}
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