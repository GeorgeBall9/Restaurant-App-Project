import "./AdditionalDetailsView.css";
import AdditionalDetail from "./AdditionalDetail/AdditionalDetail";
import {faLeaf, faLocationDot, faMoneyBillWave, faUtensils} from "@fortawesome/free-solid-svg-icons";

const AdditionalDetailsView = ({formattedAddress, price, priceLevel, primaryCuisine, dietaryRestrictions}) => {
    return (
        <div className="additional-details-view">
            <h2>Additional Details</h2>

            <div>
                <AdditionalDetail
                    icon={faLocationDot}
                    name="Location"
                    content={formattedAddress}
                />

                <AdditionalDetail
                    icon={faMoneyBillWave}
                    name="Price"
                    content={price || priceLevel || 'N/A'}
                />

                <AdditionalDetail
                    icon={faUtensils}
                    name="Cuisine"
                    content={primaryCuisine || 'N/A'}
                />

                {dietaryRestrictions && (
                    <AdditionalDetail
                        icon={faLeaf}
                        name="Dietary Restrictions"
                        content={dietaryRestrictions.join(', ')}
                    />
                )}
            </div>
        </div>
    );
};

export default AdditionalDetailsView;