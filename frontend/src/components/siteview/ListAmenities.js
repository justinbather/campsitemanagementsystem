import React, { useEffect, useState } from 'react';

const ListAmenities = (props) => {
    /* Takes in site : {
       ...site,
       amenities: {id, name}
    }

    */

    return(
        <>
        {props.amenities && props.amenities.map((amenity, index) => (
            <div className="w-[6rem] h-6 my-5 px-5 rounded-xl bg-base-100 drop-shadow-lg text-center hover:ring-2 ring-neutral-300">
            <p key={index} className="text-sm text-dark">{amenity.name}</p>
                </div>
    ))}
    </>
    );
};

export default ListAmenities;