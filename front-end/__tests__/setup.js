// setup.js
import {afterEach} from "vitest";
import {cleanup} from "@testing-library/react";

afterEach(()=>{
	// console.log("afterEach CLEANUP GLOBAL");
	cleanup();
});