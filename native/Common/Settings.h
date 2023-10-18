#pragma once
#include "cocos2d.h"
#include "gworld/components/EnhancedComponent.h"
#include "gworld/Polyfill.h"

using namespace std;

NS_SAFEX_BEGIN

static ax::Size smallResolutionSize = ax::Size(360, 780);
static ax::Size designResolutionSize = ax::Size(720, 1560);

inline void configSettings()
{
  // SpriteFrameCache::getInstance()
  //     ->addSpriteFramesWithFile("texture/bullet/new_bullet.plist", "texture/bullet/new_bullet.png");
  // vector<vector<bool>> matrix = {
  //     {false},
  //     {false, false, false, false, true},
  //     {false, false, false, true, false, true},
  //     {false, false, true, false, false},
  //     {false, true, false, false, false},
  //     {false, false, true, false, false, false}};
  // GameWorld::getInstance()
  //     ->systems.system<ColliderSystem>()
  //     ->setCollisionMatrix(matrix);
}

NS_SAFEX_END
