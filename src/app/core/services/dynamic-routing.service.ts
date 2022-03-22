import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
/*
* This service will provide components with the ability to dynamically create
* routes within the application
*/
export class DynamicRoutingService {

    /*
    *
    * @property {array} links
    */
    private links = new Array<{ text: string, path: string, icon: string }>();

    constructor() { }

    /*
    * Method to fetch data
    *
    */
    getLinks() {
        return this.links;
    }

    /*
    * Method to store data
    * @param text, path, icon
    */
    addItem({ text, path, icon = null }) {
        this.links.push({ text: text, path: path, icon: icon });
    }

    /*
    * Method to remove a specific link0
    * @param text
    */
    removeItem({ text }) {
        this.links.forEach((link, index) => {
            if (link.text === text) {
                this.links.splice(index, 1);
            }
        });
    }

    /*
    * Remove all links from the array
    */
    clearAll() {
        this.links.length = 0;
    }
}