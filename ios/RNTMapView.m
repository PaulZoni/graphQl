//
//  RNTMapView.m
//  graphQl
//
//  Created by Павел on 19/06/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <MapKit/MapKit.h>
#import <React/RCTComponent.h>

@interface RNTMapView: MKMapView
@property(nonatomic, copy) RCTBubblingEventBlock onRegionChange;
@end

@implementation RNTMapView
@end
