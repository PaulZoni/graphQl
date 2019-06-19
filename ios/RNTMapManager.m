//
//  RNTMapManager.m
//  graphQl
//
//  Created by Павел on 18/06/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <MapKit/MapKit.h>
#import <React/RCTViewManager.h>
#import "RCTConvert.m"

@interface RNTMapManager: RCTViewManager
@end

@implementation RNTMapManager

RCT_EXPORT_MODULE(RNTMap);
RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL);
RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, MKMapView)
{
  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
}


- (UIView *)view
{
  return [[MKMapView alloc]init];
}


@end

