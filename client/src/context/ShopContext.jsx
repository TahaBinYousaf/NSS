import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	cars,
	houses,
	mobiles,
	services,
	animals,
	kids,
	bikes,
	products,
} from '../assets/assests';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
	const currency = 'Rs.';

	const navigate = useNavigate();

	const value = {
		mobiles,
		kids,
		currency,
		cars,
		houses,
		services,
		bikes,
		products,
		animals,
	};
	return (
		<ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
	);
};
export default ShopContextProvider;
