'use strict';

import 'bootstrap';
import jQuery from 'jquery';
import 'popper.js';

window.jQuery = window.$ = jQuery;

$('[data-toggle="tooltip"]').tooltip();
$('[data-toggle="popover"]').popover();

console.log('Hello World!');
