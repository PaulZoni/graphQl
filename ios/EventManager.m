//
//  EventManager.m
//  graphQl
//
//  Created by Павел on 13/06/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "EventManager.h"
#import <React/RCTLog.h>

@implementation EventManager
  bool hasListeners;

RCT_EXPORT_MODULE();


+ (id)allocWithZone:(NSZone *)zone {
  static EventManager *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [super allocWithZone:zone];
  });
  return sharedInstance;
}

- (void)sendNotificationToReactNative
{
  [self sendEventWithName:@"sayHello" body:@"Hello"];
}


- (NSArray<NSString *> *)supportedEvents
{
  return @[@"sayHello"];
}


-(void)startObserving {
  hasListeners = YES;
}

-(void)stopObserving {
  hasListeners = NO;
}


@end
