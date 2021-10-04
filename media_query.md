/_------------------------------------------
Responsive Grid Media Queries - 1280, 1024, 768, 480
1280-1024 - desktop (default grid)
1024-768 - tablet landscape
768-480 - tablet
480-less - phone landscape & smaller
--------------------------------------------_/
@media all and (min-width: 1024px) and (max-width: 1280px) { }

@media all and (min-width: 768px) and (max-width: 1024px) { }

@media all and (min-width: 480px) and (max-width: 768px) { }

@media all and (max-width: 480px) { }

/_------------------------------------------
Foundation Media Queries
http://foundation.zurb.com/docs/media-queries.html
--------------------------------------------_/

/_ Small screens - MOBILE _/
@media only screen { } /_ Define mobile styles - Mobile First _/

@media only screen and (max-width: 40em) { } /_ max-width 640px, mobile-only styles, use when QAing mobile issues _/

/_ Medium screens - TABLET _/
@media only screen and (min-width: 40.063em) { } /_ min-width 641px, medium screens _/

@media only screen and (min-width: 40.063em) and (max-width: 64em) { } /_ min-width 641px and max-width 1024px, use when QAing tablet-only issues _/

/_ Large screens - DESKTOP _/
@media only screen and (min-width: 64.063em) { } /_ min-width 1025px, large screens _/

@media only screen and (min-width: 64.063em) and (max-width: 90em) { } /_ min-width 1024px and max-width 1440px, use when QAing large screen-only issues _/

/_ XLarge screens _/
@media only screen and (min-width: 90.063em) { } /_ min-width 1441px, xlarge screens _/

@media only screen and (min-width: 90.063em) and (max-width: 120em) { } /_ min-width 1441px and max-width 1920px, use when QAing xlarge screen-only issues _/

/_ XXLarge screens _/
@media only screen and (min-width: 120.063em) { } /_ min-width 1921px, xlarge screens _/

/_------------------------------------------_/

/_ Portrait _/
@media screen and (orientation:portrait) { /_ Portrait styles here _/ }
/_ Landscape _/
@media screen and (orientation:landscape) { /_ Landscape styles here _/ }

/_ CSS for iPhone, iPad, and Retina Displays _/

/_ Non-Retina _/
@media screen and (-webkit-max-device-pixel-ratio: 1) {
}

/_ Retina _/
@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
only screen and (-o-min-device-pixel-ratio: 3/2),
only screen and (min--moz-device-pixel-ratio: 1.5),
only screen and (min-device-pixel-ratio: 1.5) {
}

/_ iPhone Portrait _/
@media screen and (max-device-width: 480px) and (orientation:portrait) {
}

/_ iPhone Landscape _/
@media screen and (max-device-width: 480px) and (orientation:landscape) {
}

/_ iPad Portrait _/
@media screen and (min-device-width: 481px) and (orientation:portrait) {
}

/_ iPad Landscape _/
@media screen and (min-device-width: 481px) and (orientation:landscape) {
}

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
