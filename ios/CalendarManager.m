//
//  CalendarManager.m
//  graphQl
//
//  Created by Павел on 11/06/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CalendarManager.h"
#import <React/RCTLog.h>

@implementation CalendarManager

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  
  RCTLog(@"Pretending to create an event %@ and %@", name, location);
}

RCT_EXPORT_METHOD(findEvent:(RCTResponseSenderBlock)callback)
{
  NSArray *events;
  events = [NSArray arrayWithObjects:  @"foo", @"bar", @"cat", nil];
  callback(@[[NSNull null], events]);

}


@end
