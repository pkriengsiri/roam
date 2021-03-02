# roam

### References:
CSS animations: https://www.w3schools.com/css/css3_animations.asp
Convert SVG to jsx: https://svg2jsx.com/ 
Setting up protected client side routes with cookies and isLoading:  https://levelup.gitconnected.com/react-template-for-jwt-authentication-with-private-routes-and-redirects-f77c488bfb85


# Splitting amount contributed

Display radio button or selector for "I paid for everything" or "Custom Split"
When the option is selected, display fields for each traveler
Value for each of these fields stored as an array of objects in state {_id,amount}
If "I paid for everything", populate the fields with the amount assigned to the person creating the expense and zero for everyone else
If "Custom Split", do some math behind the scenes to validate the sum of the inputs matches the expense amount


# Technologies used
bcrypt, jwt, cookies, airbnb date range picker, chartjs, google places api, cloudinary, figma, canva