/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
//#import <objc/runtime.h>// TODO: remove if want to use Dynamic Type
#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

//// TODO: remove if want to use Dynamic Type
//NSString* swizzled_preferredContentSizeCategory(id self, SEL _cmd)
//{
//  return UIContentSizeCategoryLarge;  // Set category you prefer, Large being iOS' default.
//}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
//  // TODO: remove if want to use Dynamic Type (start)
//  Method method = class_getInstanceMethod([UIApplication class], @selector(preferredContentSizeCategory));
//  method_setImplementation(method, (IMP)swizzled_preferredContentSizeCategory);
//  // TODO: remove if want to use Dynamic Type (end)


  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"ChampionsForHealth"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
