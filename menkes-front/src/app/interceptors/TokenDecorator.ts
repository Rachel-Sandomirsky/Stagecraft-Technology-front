import { Injectable } from '@angular/core';
import 'reflect-metadata'; // לוודא שהספריה מותקנת

// דקורטור המצביע שהפונקציה דורשת טוקן
export const RequiresToken = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // שמירת מידע במטא-דאטה שמצביע שדרוש טוקן
    Reflect.defineMetadata('requiresToken', true, target, propertyKey); 
  };
};