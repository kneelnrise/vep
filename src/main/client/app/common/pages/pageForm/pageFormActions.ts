import { Action } from 'fluxx'
import {PageInformation} from "../pageModel";

export const initialize = Action<PageInformation>("initialize")

export const initializeEmpty = Action("initializeEmpty")

export const updateCanonical = Action<string>("updateCanonical")

export const updateTitle = Action<string>("updateTitle")

export const updateOrder = Action<number>("updateOrder")

export const updateContent = Action<string>("updateContent")

export const updateErrors = Action<Array<string>>("updateErrors")

export const closeErrors = Action("closeErrors")

export const success = Action("success")