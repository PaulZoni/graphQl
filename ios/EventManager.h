//
//  EventManager.h
//  graphQl
//
//  Created by Павел on 13/06/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <UIKit/UIKit.h>
#ifndef EventManager_h
#define EventManager_h


#endif /* EventManager_h */

@interface EventManager : RCTEventEmitter<RCTBridgeModule, UIApplicationDelegate>
- (void)sendNotificationToReactNative;
@end
