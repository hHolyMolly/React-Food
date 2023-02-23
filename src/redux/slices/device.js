import { createSlice } from '@reduxjs/toolkit';

let checkDevice = {
	Android: function () { return navigator.userAgent.match(/Android/i); },
	BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
	iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
	Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
	Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
	any: function () { return (checkDevice.Android() || checkDevice.BlackBerry() || checkDevice.iOS() || checkDevice.Opera() || checkDevice.Windows()); }
};

const initialState = {
	isMobile: checkDevice.any() ? true : false
};

const deviceSlice = createSlice({
	name: 'device',
	initialState
});

export default deviceSlice.reducer;