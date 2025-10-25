#include <metal_stdlib>
#include <simd/simd.h>
using namespace metal;
#if 0
NGS_BACKEND_SHADER_FLAGS_BEGIN__
NGS_BACKEND_SHADER_FLAGS_END__
#endif
//efine SC_DISABLE_FRUSTUM_CULLING 1
namespace SNAP_VS {
int sc_GetStereoViewIndex()
{
    return 0;
}
}
    #ifndef sc_TextureRenderingLayout_Regular
        #define sc_TextureRenderingLayout_Regular 0
        #define sc_TextureRenderingLayout_StereoInstancedClipped 1
        #define sc_TextureRenderingLayout_StereoMultiview 2
    #endif
    #define depthToGlobal   depthScreenToViewSpace
    #define depthToLocal    depthViewToScreenSpace
    #ifndef quantizeUV
        #define quantizeUV sc_QuantizeUV
        #define sc_platformUVFlip sc_PlatformFlipV
        #define sc_PlatformFlipUV sc_PlatformFlipV
    #endif
    #ifndef sc_SampleTexture
        #define sc_SampleTexture sc_SampleTextureBiasOrLevel
    #endif
    #ifndef sc_texture2DLod
        #define sc_texture2DLod sc_InternalTextureLevel
        #define sc_textureLod sc_InternalTextureLevel
        #define sc_textureBias sc_InternalTextureBiasOrLevel
        #define sc_texture sc_InternalTexture
    #endif
//SG_REFLECTION_BEGIN(200)
//attribute vec4 boneData 5
//attribute vec3 blendShape0Pos 6
//attribute vec3 blendShape0Normal 12
//attribute vec3 blendShape1Pos 7
//attribute vec3 blendShape1Normal 13
//attribute vec3 blendShape2Pos 8
//attribute vec3 blendShape2Normal 14
//attribute vec3 blendShape3Pos 9
//attribute vec3 blendShape4Pos 10
//attribute vec3 blendShape5Pos 11
//attribute vec4 position 0
//attribute vec3 normal 1
//attribute vec4 tangent 2
//attribute vec2 texture0 3
//attribute vec2 texture1 4
//attribute vec4 color 18
//attribute float spritetimestamp 19
//attribute float spriteindex 20
//attribute vec3 positionNext 15
//attribute vec3 positionPrevious 16
//attribute vec4 strandProperties 17
//output vec4 FragColor0 0
//output vec4 FragColor1 1
//output vec4 FragColor2 2
//output vec4 FragColor3 3
//output uvec4 position_and_mask 0
//output uvec4 normal_and_more 1
//sampler sampler intensityTextureSmpSC 0:20
//sampler sampler sc_EnvmapDiffuseSmpSC 0:21
//sampler sampler sc_EnvmapSpecularSmpSC 0:22
//sampler sampler sc_RayTracedAoTextureSmpSC 0:24
//sampler sampler sc_RayTracedDiffIndTextureSmpSC 0:25
//sampler sampler sc_RayTracedReflectionTextureSmpSC 0:26
//sampler sampler sc_RayTracedShadowTextureSmpSC 0:27
//sampler sampler sc_SSAOTextureSmpSC 0:28
//sampler sampler sc_ScreenTextureSmpSC 0:29
//sampler sampler sc_ShadowTextureSmpSC 0:30
//texture texture2D intensityTexture 0:1:0:20
//texture texture2D sc_EnvmapDiffuse 0:2:0:21
//texture texture2D sc_EnvmapSpecular 0:3:0:22
//texture texture2D sc_RayTracedAoTexture 0:12:0:24
//texture texture2D sc_RayTracedDiffIndTexture 0:13:0:25
//texture texture2D sc_RayTracedReflectionTexture 0:14:0:26
//texture texture2D sc_RayTracedShadowTexture 0:15:0:27
//texture texture2D sc_SSAOTexture 0:16:0:28
//texture texture2D sc_ScreenTexture 0:17:0:29
//texture texture2D sc_ShadowTexture 0:18:0:30
//ubo float sc_BonesUBO 0:0:96 {
//sc_Bone_t sc_Bones 0:[]:96
//float4 sc_Bones.boneMatrix 0:[3]:16
//float4 sc_Bones.normalMatrix 48:[3]:16
//}
//ubo int UserUniforms 0:32:4560 {
//sc_PointLight_t sc_PointLights 0:[3]:80
//bool sc_PointLights.falloffEnabled 0
//float sc_PointLights.falloffEndDistance 4
//float sc_PointLights.negRcpFalloffEndDistance4 8
//float sc_PointLights.angleScale 12
//float sc_PointLights.angleOffset 16
//float3 sc_PointLights.direction 32
//float3 sc_PointLights.position 48
//float4 sc_PointLights.color 64
//sc_DirectionalLight_t sc_DirectionalLights 240:[5]:32
//float3 sc_DirectionalLights.direction 0
//float4 sc_DirectionalLights.color 16
//sc_AmbientLight_t sc_AmbientLights 400:[3]:32
//float3 sc_AmbientLights.color 0
//float sc_AmbientLights.intensity 16
//sc_LightEstimationData_t sc_LightEstimationData 496
//sc_SphericalGaussianLight_t sc_LightEstimationData.sg 0:[12]:48
//float3 sc_LightEstimationData.sg.color 0
//float sc_LightEstimationData.sg.sharpness 16
//float3 sc_LightEstimationData.sg.axis 32
//float3 sc_LightEstimationData.ambientLight 576
//float4 sc_EnvmapDiffuseSize 1088
//float4 sc_EnvmapSpecularSize 1136
//float3 sc_EnvmapRotation 1184
//float sc_EnvmapExposure 1200
//float3 sc_Sh 1216:[9]:16
//float sc_ShIntensity 1360
//float4 sc_Time 1376
//float4 sc_UniformConstants 1392
//float4x4 sc_ViewProjectionMatrixArray 1680:[2]:64
//float4x4 sc_ModelViewMatrixArray 1936:[2]:64
//float4x4 sc_ProjectionMatrixArray 2384:[2]:64
//float4x4 sc_ProjectionMatrixInverseArray 2512:[2]:64
//float4x4 sc_ViewMatrixArray 2640:[2]:64
//float4x4 sc_ViewMatrixInverseArray 2768:[2]:64
//float4x4 sc_PrevFrameViewProjectionMatrixArray 2896:[2]:64
//float4x4 sc_ModelMatrix 3024
//float4x4 sc_ModelMatrixInverse 3088
//float3x3 sc_NormalMatrix 3152
//float4x4 sc_PrevFrameModelMatrix 3248
//float4 sc_CurrentRenderTargetDims 3456
//sc_Camera_t sc_Camera 3472
//float3 sc_Camera.position 0
//float sc_Camera.aspect 16
//float2 sc_Camera.clipPlanes 24
//float sc_ShadowDensity 3504
//float4 sc_ShadowColor 3520
//float4x4 sc_ProjectorMatrix 3536
//float shaderComplexityValue 3604
//float4 weights0 3616
//float4 weights1 3632
//float4 sc_StereoClipPlanes 3664:[2]:16
//float _sc_framebufferFetchMarker 3700
//float2 sc_TAAJitterOffset 3704
//bool receivesRayTracedReflections 3824
//bool receivesRayTracedShadows 3828
//bool receivesRayTracedDiffuseIndirect 3832
//bool receivesRayTracedAo 3836
//float receiver_mask 4032
//float3 OriginNormalizationScale 4048
//float3 OriginNormalizationOffset 4080
//int receiverId 4096
//float correctedIntensity 4100
//float3x3 intensityTextureTransform 4160
//float4 intensityTextureUvMinMax 4208
//float4 intensityTextureBorderColor 4224
//int PreviewEnabled 4388
//float alphaTestThreshold 4396
//float4 baseColor 4400
//float Port_Value_N044 4416
//float Port_Multiplier_N086 4420
//float Port_Value_N073 4424
//float Port_Scale_N083 4428
//float Port_RangeMinB_N085 4432
//float Port_RangeMaxB_N085 4436
//float Port_Input1_N045 4440
//float Port_Input1_N046 4444
//float2 Port_Input1_N041 4448
//float2 Port_Input1_N099 4456
//float Port_Value2_N100 4464
//float Port_Opacity_N000 4468
//float3 Port_Emissive_N000 4480
//float Port_Value_N001 4496
//float Port_Value_N002 4500
//float3 Port_AO_N000 4512
//float3 Port_SpecularAO_N000 4528
//float Port_Input1_N105 4544
//}
//spec_const bool BLEND_MODE_AVERAGE 0 0
//spec_const bool BLEND_MODE_BRIGHT 1 0
//spec_const bool BLEND_MODE_COLOR_BURN 2 0
//spec_const bool BLEND_MODE_COLOR_DODGE 3 0
//spec_const bool BLEND_MODE_COLOR 4 0
//spec_const bool BLEND_MODE_DARKEN 5 0
//spec_const bool BLEND_MODE_DIFFERENCE 6 0
//spec_const bool BLEND_MODE_DIVIDE 7 0
//spec_const bool BLEND_MODE_DIVISION 8 0
//spec_const bool BLEND_MODE_EXCLUSION 9 0
//spec_const bool BLEND_MODE_FORGRAY 10 0
//spec_const bool BLEND_MODE_HARD_GLOW 11 0
//spec_const bool BLEND_MODE_HARD_LIGHT 12 0
//spec_const bool BLEND_MODE_HARD_MIX 13 0
//spec_const bool BLEND_MODE_HARD_PHOENIX 14 0
//spec_const bool BLEND_MODE_HARD_REFLECT 15 0
//spec_const bool BLEND_MODE_HUE 16 0
//spec_const bool BLEND_MODE_INTENSE 17 0
//spec_const bool BLEND_MODE_LIGHTEN 18 0
//spec_const bool BLEND_MODE_LINEAR_LIGHT 19 0
//spec_const bool BLEND_MODE_LUMINOSITY 20 0
//spec_const bool BLEND_MODE_NEGATION 21 0
//spec_const bool BLEND_MODE_NOTBRIGHT 22 0
//spec_const bool BLEND_MODE_OVERLAY 23 0
//spec_const bool BLEND_MODE_PIN_LIGHT 24 0
//spec_const bool BLEND_MODE_REALISTIC 25 0
//spec_const bool BLEND_MODE_SATURATION 26 0
//spec_const bool BLEND_MODE_SOFT_LIGHT 27 0
//spec_const bool BLEND_MODE_SUBTRACT 28 0
//spec_const bool BLEND_MODE_VIVID_LIGHT 29 0
//spec_const bool ENABLE_STIPPLE_PATTERN_TEST 30 0
//spec_const bool SC_USE_CLAMP_TO_BORDER_intensityTexture 31 0
//spec_const bool SC_USE_UV_MIN_MAX_intensityTexture 32 0
//spec_const bool SC_USE_UV_TRANSFORM_intensityTexture 33 0
//spec_const bool UseViewSpaceDepthVariant 34 1
//spec_const bool intensityTextureHasSwappedViews 35 0
//spec_const bool sc_BlendMode_AddWithAlphaFactor 36 0
//spec_const bool sc_BlendMode_Add 37 0
//spec_const bool sc_BlendMode_AlphaTest 38 0
//spec_const bool sc_BlendMode_AlphaToCoverage 39 0
//spec_const bool sc_BlendMode_ColoredGlass 40 0
//spec_const bool sc_BlendMode_Custom 41 0
//spec_const bool sc_BlendMode_Max 42 0
//spec_const bool sc_BlendMode_Min 43 0
//spec_const bool sc_BlendMode_MultiplyOriginal 44 0
//spec_const bool sc_BlendMode_Multiply 45 0
//spec_const bool sc_BlendMode_Normal 46 0
//spec_const bool sc_BlendMode_PremultipliedAlphaAuto 47 0
//spec_const bool sc_BlendMode_PremultipliedAlphaHardware 48 0
//spec_const bool sc_BlendMode_PremultipliedAlpha 49 0
//spec_const bool sc_BlendMode_Screen 50 0
//spec_const bool sc_DepthOnly 51 0
//spec_const bool sc_EnvmapDiffuseHasSwappedViews 52 0
//spec_const bool sc_EnvmapSpecularHasSwappedViews 53 0
//spec_const bool sc_FramebufferFetch 54 0
//spec_const bool sc_HasDiffuseEnvmap 55 0
//spec_const bool sc_LightEstimation 56 0
//spec_const bool sc_MotionVectorsPass 57 0
//spec_const bool sc_OITCompositingPass 58 0
//spec_const bool sc_OITDepthBoundsPass 59 0
//spec_const bool sc_OITDepthGatherPass 60 0
//spec_const bool sc_ProjectiveShadowsCaster 61 0
//spec_const bool sc_ProjectiveShadowsReceiver 62 0
//spec_const bool sc_RayTracedAoTextureHasSwappedViews 63 0
//spec_const bool sc_RayTracedDiffIndTextureHasSwappedViews 64 0
//spec_const bool sc_RayTracedReflectionTextureHasSwappedViews 65 0
//spec_const bool sc_RayTracedShadowTextureHasSwappedViews 66 0
//spec_const bool sc_RenderAlphaToColor 67 0
//spec_const bool sc_SSAOEnabled 68 0
//spec_const bool sc_ScreenTextureHasSwappedViews 69 0
//spec_const bool sc_ShaderComplexityAnalyzer 70 0
//spec_const bool sc_TAAEnabled 71 0
//spec_const bool sc_UseFramebufferFetchMarker 72 0
//spec_const bool sc_VertexBlendingUseNormals 73 0
//spec_const bool sc_VertexBlending 74 0
//spec_const int SC_DEVICE_CLASS 75 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_U_intensityTexture 76 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_V_intensityTexture 77 -1
//spec_const int intensityTextureLayout 78 0
//spec_const int sc_AmbientLightMode0 79 0
//spec_const int sc_AmbientLightMode1 80 0
//spec_const int sc_AmbientLightMode2 81 0
//spec_const int sc_AmbientLightMode_Constant 82 0
//spec_const int sc_AmbientLightMode_EnvironmentMap 83 0
//spec_const int sc_AmbientLightMode_FromCamera 84 0
//spec_const int sc_AmbientLightMode_SphericalHarmonics 85 0
//spec_const int sc_AmbientLightsCount 86 0
//spec_const int sc_DepthBufferMode 87 0
//spec_const int sc_DirectionalLightsCount 88 0
//spec_const int sc_EnvLightMode 89 0
//spec_const int sc_EnvmapDiffuseLayout 90 0
//spec_const int sc_EnvmapSpecularLayout 91 0
//spec_const int sc_LightEstimationSGCount 92 0
//spec_const int sc_MaxTextureImageUnits 93 0
//spec_const int sc_PointLightsCount 94 0
//spec_const int sc_RayTracedAoTextureLayout 95 0
//spec_const int sc_RayTracedDiffIndTextureLayout 96 0
//spec_const int sc_RayTracedReflectionTextureLayout 97 0
//spec_const int sc_RayTracedShadowTextureLayout 98 0
//spec_const int sc_RenderingSpace 99 -1
//spec_const int sc_ScreenTextureLayout 100 0
//spec_const int sc_ShaderCacheConstant 101 0
//spec_const int sc_SkinBonesCount 102 0
//spec_const int sc_StereoRenderingMode 103 0
//spec_const int sc_StereoRendering_IsClipDistanceEnabled 104 0
//SG_REFLECTION_END
constant bool BLEND_MODE_AVERAGE [[function_constant(0)]];
constant bool BLEND_MODE_AVERAGE_tmp = is_function_constant_defined(BLEND_MODE_AVERAGE) ? BLEND_MODE_AVERAGE : false;
constant bool BLEND_MODE_BRIGHT [[function_constant(1)]];
constant bool BLEND_MODE_BRIGHT_tmp = is_function_constant_defined(BLEND_MODE_BRIGHT) ? BLEND_MODE_BRIGHT : false;
constant bool BLEND_MODE_COLOR_BURN [[function_constant(2)]];
constant bool BLEND_MODE_COLOR_BURN_tmp = is_function_constant_defined(BLEND_MODE_COLOR_BURN) ? BLEND_MODE_COLOR_BURN : false;
constant bool BLEND_MODE_COLOR_DODGE [[function_constant(3)]];
constant bool BLEND_MODE_COLOR_DODGE_tmp = is_function_constant_defined(BLEND_MODE_COLOR_DODGE) ? BLEND_MODE_COLOR_DODGE : false;
constant bool BLEND_MODE_COLOR [[function_constant(4)]];
constant bool BLEND_MODE_COLOR_tmp = is_function_constant_defined(BLEND_MODE_COLOR) ? BLEND_MODE_COLOR : false;
constant bool BLEND_MODE_DARKEN [[function_constant(5)]];
constant bool BLEND_MODE_DARKEN_tmp = is_function_constant_defined(BLEND_MODE_DARKEN) ? BLEND_MODE_DARKEN : false;
constant bool BLEND_MODE_DIFFERENCE [[function_constant(6)]];
constant bool BLEND_MODE_DIFFERENCE_tmp = is_function_constant_defined(BLEND_MODE_DIFFERENCE) ? BLEND_MODE_DIFFERENCE : false;
constant bool BLEND_MODE_DIVIDE [[function_constant(7)]];
constant bool BLEND_MODE_DIVIDE_tmp = is_function_constant_defined(BLEND_MODE_DIVIDE) ? BLEND_MODE_DIVIDE : false;
constant bool BLEND_MODE_DIVISION [[function_constant(8)]];
constant bool BLEND_MODE_DIVISION_tmp = is_function_constant_defined(BLEND_MODE_DIVISION) ? BLEND_MODE_DIVISION : false;
constant bool BLEND_MODE_EXCLUSION [[function_constant(9)]];
constant bool BLEND_MODE_EXCLUSION_tmp = is_function_constant_defined(BLEND_MODE_EXCLUSION) ? BLEND_MODE_EXCLUSION : false;
constant bool BLEND_MODE_FORGRAY [[function_constant(10)]];
constant bool BLEND_MODE_FORGRAY_tmp = is_function_constant_defined(BLEND_MODE_FORGRAY) ? BLEND_MODE_FORGRAY : false;
constant bool BLEND_MODE_HARD_GLOW [[function_constant(11)]];
constant bool BLEND_MODE_HARD_GLOW_tmp = is_function_constant_defined(BLEND_MODE_HARD_GLOW) ? BLEND_MODE_HARD_GLOW : false;
constant bool BLEND_MODE_HARD_LIGHT [[function_constant(12)]];
constant bool BLEND_MODE_HARD_LIGHT_tmp = is_function_constant_defined(BLEND_MODE_HARD_LIGHT) ? BLEND_MODE_HARD_LIGHT : false;
constant bool BLEND_MODE_HARD_MIX [[function_constant(13)]];
constant bool BLEND_MODE_HARD_MIX_tmp = is_function_constant_defined(BLEND_MODE_HARD_MIX) ? BLEND_MODE_HARD_MIX : false;
constant bool BLEND_MODE_HARD_PHOENIX [[function_constant(14)]];
constant bool BLEND_MODE_HARD_PHOENIX_tmp = is_function_constant_defined(BLEND_MODE_HARD_PHOENIX) ? BLEND_MODE_HARD_PHOENIX : false;
constant bool BLEND_MODE_HARD_REFLECT [[function_constant(15)]];
constant bool BLEND_MODE_HARD_REFLECT_tmp = is_function_constant_defined(BLEND_MODE_HARD_REFLECT) ? BLEND_MODE_HARD_REFLECT : false;
constant bool BLEND_MODE_HUE [[function_constant(16)]];
constant bool BLEND_MODE_HUE_tmp = is_function_constant_defined(BLEND_MODE_HUE) ? BLEND_MODE_HUE : false;
constant bool BLEND_MODE_INTENSE [[function_constant(17)]];
constant bool BLEND_MODE_INTENSE_tmp = is_function_constant_defined(BLEND_MODE_INTENSE) ? BLEND_MODE_INTENSE : false;
constant bool BLEND_MODE_LIGHTEN [[function_constant(18)]];
constant bool BLEND_MODE_LIGHTEN_tmp = is_function_constant_defined(BLEND_MODE_LIGHTEN) ? BLEND_MODE_LIGHTEN : false;
constant bool BLEND_MODE_LINEAR_LIGHT [[function_constant(19)]];
constant bool BLEND_MODE_LINEAR_LIGHT_tmp = is_function_constant_defined(BLEND_MODE_LINEAR_LIGHT) ? BLEND_MODE_LINEAR_LIGHT : false;
constant bool BLEND_MODE_LUMINOSITY [[function_constant(20)]];
constant bool BLEND_MODE_LUMINOSITY_tmp = is_function_constant_defined(BLEND_MODE_LUMINOSITY) ? BLEND_MODE_LUMINOSITY : false;
constant bool BLEND_MODE_NEGATION [[function_constant(21)]];
constant bool BLEND_MODE_NEGATION_tmp = is_function_constant_defined(BLEND_MODE_NEGATION) ? BLEND_MODE_NEGATION : false;
constant bool BLEND_MODE_NOTBRIGHT [[function_constant(22)]];
constant bool BLEND_MODE_NOTBRIGHT_tmp = is_function_constant_defined(BLEND_MODE_NOTBRIGHT) ? BLEND_MODE_NOTBRIGHT : false;
constant bool BLEND_MODE_OVERLAY [[function_constant(23)]];
constant bool BLEND_MODE_OVERLAY_tmp = is_function_constant_defined(BLEND_MODE_OVERLAY) ? BLEND_MODE_OVERLAY : false;
constant bool BLEND_MODE_PIN_LIGHT [[function_constant(24)]];
constant bool BLEND_MODE_PIN_LIGHT_tmp = is_function_constant_defined(BLEND_MODE_PIN_LIGHT) ? BLEND_MODE_PIN_LIGHT : false;
constant bool BLEND_MODE_REALISTIC [[function_constant(25)]];
constant bool BLEND_MODE_REALISTIC_tmp = is_function_constant_defined(BLEND_MODE_REALISTIC) ? BLEND_MODE_REALISTIC : false;
constant bool BLEND_MODE_SATURATION [[function_constant(26)]];
constant bool BLEND_MODE_SATURATION_tmp = is_function_constant_defined(BLEND_MODE_SATURATION) ? BLEND_MODE_SATURATION : false;
constant bool BLEND_MODE_SOFT_LIGHT [[function_constant(27)]];
constant bool BLEND_MODE_SOFT_LIGHT_tmp = is_function_constant_defined(BLEND_MODE_SOFT_LIGHT) ? BLEND_MODE_SOFT_LIGHT : false;
constant bool BLEND_MODE_SUBTRACT [[function_constant(28)]];
constant bool BLEND_MODE_SUBTRACT_tmp = is_function_constant_defined(BLEND_MODE_SUBTRACT) ? BLEND_MODE_SUBTRACT : false;
constant bool BLEND_MODE_VIVID_LIGHT [[function_constant(29)]];
constant bool BLEND_MODE_VIVID_LIGHT_tmp = is_function_constant_defined(BLEND_MODE_VIVID_LIGHT) ? BLEND_MODE_VIVID_LIGHT : false;
constant bool ENABLE_STIPPLE_PATTERN_TEST [[function_constant(30)]];
constant bool ENABLE_STIPPLE_PATTERN_TEST_tmp = is_function_constant_defined(ENABLE_STIPPLE_PATTERN_TEST) ? ENABLE_STIPPLE_PATTERN_TEST : false;
constant bool SC_USE_CLAMP_TO_BORDER_intensityTexture [[function_constant(31)]];
constant bool SC_USE_CLAMP_TO_BORDER_intensityTexture_tmp = is_function_constant_defined(SC_USE_CLAMP_TO_BORDER_intensityTexture) ? SC_USE_CLAMP_TO_BORDER_intensityTexture : false;
constant bool SC_USE_UV_MIN_MAX_intensityTexture [[function_constant(32)]];
constant bool SC_USE_UV_MIN_MAX_intensityTexture_tmp = is_function_constant_defined(SC_USE_UV_MIN_MAX_intensityTexture) ? SC_USE_UV_MIN_MAX_intensityTexture : false;
constant bool SC_USE_UV_TRANSFORM_intensityTexture [[function_constant(33)]];
constant bool SC_USE_UV_TRANSFORM_intensityTexture_tmp = is_function_constant_defined(SC_USE_UV_TRANSFORM_intensityTexture) ? SC_USE_UV_TRANSFORM_intensityTexture : false;
constant bool UseViewSpaceDepthVariant [[function_constant(34)]];
constant bool UseViewSpaceDepthVariant_tmp = is_function_constant_defined(UseViewSpaceDepthVariant) ? UseViewSpaceDepthVariant : true;
constant bool intensityTextureHasSwappedViews [[function_constant(35)]];
constant bool intensityTextureHasSwappedViews_tmp = is_function_constant_defined(intensityTextureHasSwappedViews) ? intensityTextureHasSwappedViews : false;
constant bool sc_BlendMode_AddWithAlphaFactor [[function_constant(36)]];
constant bool sc_BlendMode_AddWithAlphaFactor_tmp = is_function_constant_defined(sc_BlendMode_AddWithAlphaFactor) ? sc_BlendMode_AddWithAlphaFactor : false;
constant bool sc_BlendMode_Add [[function_constant(37)]];
constant bool sc_BlendMode_Add_tmp = is_function_constant_defined(sc_BlendMode_Add) ? sc_BlendMode_Add : false;
constant bool sc_BlendMode_AlphaTest [[function_constant(38)]];
constant bool sc_BlendMode_AlphaTest_tmp = is_function_constant_defined(sc_BlendMode_AlphaTest) ? sc_BlendMode_AlphaTest : false;
constant bool sc_BlendMode_AlphaToCoverage [[function_constant(39)]];
constant bool sc_BlendMode_AlphaToCoverage_tmp = is_function_constant_defined(sc_BlendMode_AlphaToCoverage) ? sc_BlendMode_AlphaToCoverage : false;
constant bool sc_BlendMode_ColoredGlass [[function_constant(40)]];
constant bool sc_BlendMode_ColoredGlass_tmp = is_function_constant_defined(sc_BlendMode_ColoredGlass) ? sc_BlendMode_ColoredGlass : false;
constant bool sc_BlendMode_Custom [[function_constant(41)]];
constant bool sc_BlendMode_Custom_tmp = is_function_constant_defined(sc_BlendMode_Custom) ? sc_BlendMode_Custom : false;
constant bool sc_BlendMode_Max [[function_constant(42)]];
constant bool sc_BlendMode_Max_tmp = is_function_constant_defined(sc_BlendMode_Max) ? sc_BlendMode_Max : false;
constant bool sc_BlendMode_Min [[function_constant(43)]];
constant bool sc_BlendMode_Min_tmp = is_function_constant_defined(sc_BlendMode_Min) ? sc_BlendMode_Min : false;
constant bool sc_BlendMode_MultiplyOriginal [[function_constant(44)]];
constant bool sc_BlendMode_MultiplyOriginal_tmp = is_function_constant_defined(sc_BlendMode_MultiplyOriginal) ? sc_BlendMode_MultiplyOriginal : false;
constant bool sc_BlendMode_Multiply [[function_constant(45)]];
constant bool sc_BlendMode_Multiply_tmp = is_function_constant_defined(sc_BlendMode_Multiply) ? sc_BlendMode_Multiply : false;
constant bool sc_BlendMode_Normal [[function_constant(46)]];
constant bool sc_BlendMode_Normal_tmp = is_function_constant_defined(sc_BlendMode_Normal) ? sc_BlendMode_Normal : false;
constant bool sc_BlendMode_PremultipliedAlphaAuto [[function_constant(47)]];
constant bool sc_BlendMode_PremultipliedAlphaAuto_tmp = is_function_constant_defined(sc_BlendMode_PremultipliedAlphaAuto) ? sc_BlendMode_PremultipliedAlphaAuto : false;
constant bool sc_BlendMode_PremultipliedAlphaHardware [[function_constant(48)]];
constant bool sc_BlendMode_PremultipliedAlphaHardware_tmp = is_function_constant_defined(sc_BlendMode_PremultipliedAlphaHardware) ? sc_BlendMode_PremultipliedAlphaHardware : false;
constant bool sc_BlendMode_PremultipliedAlpha [[function_constant(49)]];
constant bool sc_BlendMode_PremultipliedAlpha_tmp = is_function_constant_defined(sc_BlendMode_PremultipliedAlpha) ? sc_BlendMode_PremultipliedAlpha : false;
constant bool sc_BlendMode_Screen [[function_constant(50)]];
constant bool sc_BlendMode_Screen_tmp = is_function_constant_defined(sc_BlendMode_Screen) ? sc_BlendMode_Screen : false;
constant bool sc_DepthOnly [[function_constant(51)]];
constant bool sc_DepthOnly_tmp = is_function_constant_defined(sc_DepthOnly) ? sc_DepthOnly : false;
constant bool sc_EnvmapDiffuseHasSwappedViews [[function_constant(52)]];
constant bool sc_EnvmapDiffuseHasSwappedViews_tmp = is_function_constant_defined(sc_EnvmapDiffuseHasSwappedViews) ? sc_EnvmapDiffuseHasSwappedViews : false;
constant bool sc_EnvmapSpecularHasSwappedViews [[function_constant(53)]];
constant bool sc_EnvmapSpecularHasSwappedViews_tmp = is_function_constant_defined(sc_EnvmapSpecularHasSwappedViews) ? sc_EnvmapSpecularHasSwappedViews : false;
constant bool sc_FramebufferFetch [[function_constant(54)]];
constant bool sc_FramebufferFetch_tmp = is_function_constant_defined(sc_FramebufferFetch) ? sc_FramebufferFetch : false;
constant bool sc_HasDiffuseEnvmap [[function_constant(55)]];
constant bool sc_HasDiffuseEnvmap_tmp = is_function_constant_defined(sc_HasDiffuseEnvmap) ? sc_HasDiffuseEnvmap : false;
constant bool sc_LightEstimation [[function_constant(56)]];
constant bool sc_LightEstimation_tmp = is_function_constant_defined(sc_LightEstimation) ? sc_LightEstimation : false;
constant bool sc_MotionVectorsPass [[function_constant(57)]];
constant bool sc_MotionVectorsPass_tmp = is_function_constant_defined(sc_MotionVectorsPass) ? sc_MotionVectorsPass : false;
constant bool sc_OITCompositingPass [[function_constant(58)]];
constant bool sc_OITCompositingPass_tmp = is_function_constant_defined(sc_OITCompositingPass) ? sc_OITCompositingPass : false;
constant bool sc_OITDepthBoundsPass [[function_constant(59)]];
constant bool sc_OITDepthBoundsPass_tmp = is_function_constant_defined(sc_OITDepthBoundsPass) ? sc_OITDepthBoundsPass : false;
constant bool sc_OITDepthGatherPass [[function_constant(60)]];
constant bool sc_OITDepthGatherPass_tmp = is_function_constant_defined(sc_OITDepthGatherPass) ? sc_OITDepthGatherPass : false;
constant bool sc_ProjectiveShadowsCaster [[function_constant(61)]];
constant bool sc_ProjectiveShadowsCaster_tmp = is_function_constant_defined(sc_ProjectiveShadowsCaster) ? sc_ProjectiveShadowsCaster : false;
constant bool sc_ProjectiveShadowsReceiver [[function_constant(62)]];
constant bool sc_ProjectiveShadowsReceiver_tmp = is_function_constant_defined(sc_ProjectiveShadowsReceiver) ? sc_ProjectiveShadowsReceiver : false;
constant bool sc_RayTracedAoTextureHasSwappedViews [[function_constant(63)]];
constant bool sc_RayTracedAoTextureHasSwappedViews_tmp = is_function_constant_defined(sc_RayTracedAoTextureHasSwappedViews) ? sc_RayTracedAoTextureHasSwappedViews : false;
constant bool sc_RayTracedDiffIndTextureHasSwappedViews [[function_constant(64)]];
constant bool sc_RayTracedDiffIndTextureHasSwappedViews_tmp = is_function_constant_defined(sc_RayTracedDiffIndTextureHasSwappedViews) ? sc_RayTracedDiffIndTextureHasSwappedViews : false;
constant bool sc_RayTracedReflectionTextureHasSwappedViews [[function_constant(65)]];
constant bool sc_RayTracedReflectionTextureHasSwappedViews_tmp = is_function_constant_defined(sc_RayTracedReflectionTextureHasSwappedViews) ? sc_RayTracedReflectionTextureHasSwappedViews : false;
constant bool sc_RayTracedShadowTextureHasSwappedViews [[function_constant(66)]];
constant bool sc_RayTracedShadowTextureHasSwappedViews_tmp = is_function_constant_defined(sc_RayTracedShadowTextureHasSwappedViews) ? sc_RayTracedShadowTextureHasSwappedViews : false;
constant bool sc_RenderAlphaToColor [[function_constant(67)]];
constant bool sc_RenderAlphaToColor_tmp = is_function_constant_defined(sc_RenderAlphaToColor) ? sc_RenderAlphaToColor : false;
constant bool sc_SSAOEnabled [[function_constant(68)]];
constant bool sc_SSAOEnabled_tmp = is_function_constant_defined(sc_SSAOEnabled) ? sc_SSAOEnabled : false;
constant bool sc_ScreenTextureHasSwappedViews [[function_constant(69)]];
constant bool sc_ScreenTextureHasSwappedViews_tmp = is_function_constant_defined(sc_ScreenTextureHasSwappedViews) ? sc_ScreenTextureHasSwappedViews : false;
constant bool sc_ShaderComplexityAnalyzer [[function_constant(70)]];
constant bool sc_ShaderComplexityAnalyzer_tmp = is_function_constant_defined(sc_ShaderComplexityAnalyzer) ? sc_ShaderComplexityAnalyzer : false;
constant bool sc_TAAEnabled [[function_constant(71)]];
constant bool sc_TAAEnabled_tmp = is_function_constant_defined(sc_TAAEnabled) ? sc_TAAEnabled : false;
constant bool sc_UseFramebufferFetchMarker [[function_constant(72)]];
constant bool sc_UseFramebufferFetchMarker_tmp = is_function_constant_defined(sc_UseFramebufferFetchMarker) ? sc_UseFramebufferFetchMarker : false;
constant bool sc_VertexBlendingUseNormals [[function_constant(73)]];
constant bool sc_VertexBlendingUseNormals_tmp = is_function_constant_defined(sc_VertexBlendingUseNormals) ? sc_VertexBlendingUseNormals : false;
constant bool sc_VertexBlending [[function_constant(74)]];
constant bool sc_VertexBlending_tmp = is_function_constant_defined(sc_VertexBlending) ? sc_VertexBlending : false;
constant int SC_DEVICE_CLASS [[function_constant(75)]];
constant int SC_DEVICE_CLASS_tmp = is_function_constant_defined(SC_DEVICE_CLASS) ? SC_DEVICE_CLASS : -1;
constant int SC_SOFTWARE_WRAP_MODE_U_intensityTexture [[function_constant(76)]];
constant int SC_SOFTWARE_WRAP_MODE_U_intensityTexture_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_U_intensityTexture) ? SC_SOFTWARE_WRAP_MODE_U_intensityTexture : -1;
constant int SC_SOFTWARE_WRAP_MODE_V_intensityTexture [[function_constant(77)]];
constant int SC_SOFTWARE_WRAP_MODE_V_intensityTexture_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_V_intensityTexture) ? SC_SOFTWARE_WRAP_MODE_V_intensityTexture : -1;
constant int intensityTextureLayout [[function_constant(78)]];
constant int intensityTextureLayout_tmp = is_function_constant_defined(intensityTextureLayout) ? intensityTextureLayout : 0;
constant int sc_AmbientLightMode0 [[function_constant(79)]];
constant int sc_AmbientLightMode0_tmp = is_function_constant_defined(sc_AmbientLightMode0) ? sc_AmbientLightMode0 : 0;
constant int sc_AmbientLightMode1 [[function_constant(80)]];
constant int sc_AmbientLightMode1_tmp = is_function_constant_defined(sc_AmbientLightMode1) ? sc_AmbientLightMode1 : 0;
constant int sc_AmbientLightMode2 [[function_constant(81)]];
constant int sc_AmbientLightMode2_tmp = is_function_constant_defined(sc_AmbientLightMode2) ? sc_AmbientLightMode2 : 0;
constant int sc_AmbientLightMode_Constant [[function_constant(82)]];
constant int sc_AmbientLightMode_Constant_tmp = is_function_constant_defined(sc_AmbientLightMode_Constant) ? sc_AmbientLightMode_Constant : 0;
constant int sc_AmbientLightMode_EnvironmentMap [[function_constant(83)]];
constant int sc_AmbientLightMode_EnvironmentMap_tmp = is_function_constant_defined(sc_AmbientLightMode_EnvironmentMap) ? sc_AmbientLightMode_EnvironmentMap : 0;
constant int sc_AmbientLightMode_FromCamera [[function_constant(84)]];
constant int sc_AmbientLightMode_FromCamera_tmp = is_function_constant_defined(sc_AmbientLightMode_FromCamera) ? sc_AmbientLightMode_FromCamera : 0;
constant int sc_AmbientLightMode_SphericalHarmonics [[function_constant(85)]];
constant int sc_AmbientLightMode_SphericalHarmonics_tmp = is_function_constant_defined(sc_AmbientLightMode_SphericalHarmonics) ? sc_AmbientLightMode_SphericalHarmonics : 0;
constant int sc_AmbientLightsCount [[function_constant(86)]];
constant int sc_AmbientLightsCount_tmp = is_function_constant_defined(sc_AmbientLightsCount) ? sc_AmbientLightsCount : 0;
constant int sc_DepthBufferMode [[function_constant(87)]];
constant int sc_DepthBufferMode_tmp = is_function_constant_defined(sc_DepthBufferMode) ? sc_DepthBufferMode : 0;
constant int sc_DirectionalLightsCount [[function_constant(88)]];
constant int sc_DirectionalLightsCount_tmp = is_function_constant_defined(sc_DirectionalLightsCount) ? sc_DirectionalLightsCount : 0;
constant int sc_EnvLightMode [[function_constant(89)]];
constant int sc_EnvLightMode_tmp = is_function_constant_defined(sc_EnvLightMode) ? sc_EnvLightMode : 0;
constant int sc_EnvmapDiffuseLayout [[function_constant(90)]];
constant int sc_EnvmapDiffuseLayout_tmp = is_function_constant_defined(sc_EnvmapDiffuseLayout) ? sc_EnvmapDiffuseLayout : 0;
constant int sc_EnvmapSpecularLayout [[function_constant(91)]];
constant int sc_EnvmapSpecularLayout_tmp = is_function_constant_defined(sc_EnvmapSpecularLayout) ? sc_EnvmapSpecularLayout : 0;
constant int sc_LightEstimationSGCount [[function_constant(92)]];
constant int sc_LightEstimationSGCount_tmp = is_function_constant_defined(sc_LightEstimationSGCount) ? sc_LightEstimationSGCount : 0;
constant int sc_MaxTextureImageUnits [[function_constant(93)]];
constant int sc_MaxTextureImageUnits_tmp = is_function_constant_defined(sc_MaxTextureImageUnits) ? sc_MaxTextureImageUnits : 0;
constant int sc_PointLightsCount [[function_constant(94)]];
constant int sc_PointLightsCount_tmp = is_function_constant_defined(sc_PointLightsCount) ? sc_PointLightsCount : 0;
constant int sc_RayTracedAoTextureLayout [[function_constant(95)]];
constant int sc_RayTracedAoTextureLayout_tmp = is_function_constant_defined(sc_RayTracedAoTextureLayout) ? sc_RayTracedAoTextureLayout : 0;
constant int sc_RayTracedDiffIndTextureLayout [[function_constant(96)]];
constant int sc_RayTracedDiffIndTextureLayout_tmp = is_function_constant_defined(sc_RayTracedDiffIndTextureLayout) ? sc_RayTracedDiffIndTextureLayout : 0;
constant int sc_RayTracedReflectionTextureLayout [[function_constant(97)]];
constant int sc_RayTracedReflectionTextureLayout_tmp = is_function_constant_defined(sc_RayTracedReflectionTextureLayout) ? sc_RayTracedReflectionTextureLayout : 0;
constant int sc_RayTracedShadowTextureLayout [[function_constant(98)]];
constant int sc_RayTracedShadowTextureLayout_tmp = is_function_constant_defined(sc_RayTracedShadowTextureLayout) ? sc_RayTracedShadowTextureLayout : 0;
constant int sc_RenderingSpace [[function_constant(99)]];
constant int sc_RenderingSpace_tmp = is_function_constant_defined(sc_RenderingSpace) ? sc_RenderingSpace : -1;
constant int sc_ScreenTextureLayout [[function_constant(100)]];
constant int sc_ScreenTextureLayout_tmp = is_function_constant_defined(sc_ScreenTextureLayout) ? sc_ScreenTextureLayout : 0;
constant int sc_ShaderCacheConstant [[function_constant(101)]];
constant int sc_ShaderCacheConstant_tmp = is_function_constant_defined(sc_ShaderCacheConstant) ? sc_ShaderCacheConstant : 0;
constant int sc_SkinBonesCount [[function_constant(102)]];
constant int sc_SkinBonesCount_tmp = is_function_constant_defined(sc_SkinBonesCount) ? sc_SkinBonesCount : 0;
constant int sc_StereoRenderingMode [[function_constant(103)]];
constant int sc_StereoRenderingMode_tmp = is_function_constant_defined(sc_StereoRenderingMode) ? sc_StereoRenderingMode : 0;
constant int sc_StereoRendering_IsClipDistanceEnabled [[function_constant(104)]];
constant int sc_StereoRendering_IsClipDistanceEnabled_tmp = is_function_constant_defined(sc_StereoRendering_IsClipDistanceEnabled) ? sc_StereoRendering_IsClipDistanceEnabled : 0;

namespace SNAP_VS {
struct sc_Vertex_t
{
float4 position;
float3 normal;
float3 tangent;
float2 texture0;
float2 texture1;
};
struct ssGlobals
{
float gTimeElapsed;
float gTimeDelta;
float gTimeElapsedShifted;
float2 Surface_UVCoord0;
float3 SurfacePosition_ObjectSpace;
};
struct sc_PointLight_t
{
int falloffEnabled;
float falloffEndDistance;
float negRcpFalloffEndDistance4;
float angleScale;
float angleOffset;
float3 direction;
float3 position;
float4 color;
};
struct sc_DirectionalLight_t
{
float3 direction;
float4 color;
};
struct sc_AmbientLight_t
{
float3 color;
float intensity;
};
struct sc_SphericalGaussianLight_t
{
float3 color;
float sharpness;
float3 axis;
};
struct sc_LightEstimationData_t
{
sc_SphericalGaussianLight_t sg[12];
float3 ambientLight;
};
struct sc_Camera_t
{
float3 position;
float aspect;
float2 clipPlanes;
};
struct userUniformsObj
{
sc_PointLight_t sc_PointLights[3];
sc_DirectionalLight_t sc_DirectionalLights[5];
sc_AmbientLight_t sc_AmbientLights[3];
sc_LightEstimationData_t sc_LightEstimationData;
float4 sc_EnvmapDiffuseSize;
float4 sc_EnvmapDiffuseDims;
float4 sc_EnvmapDiffuseView;
float4 sc_EnvmapSpecularSize;
float4 sc_EnvmapSpecularDims;
float4 sc_EnvmapSpecularView;
float3 sc_EnvmapRotation;
float sc_EnvmapExposure;
float3 sc_Sh[9];
float sc_ShIntensity;
float4 sc_Time;
float4 sc_UniformConstants;
float4 sc_GeometryInfo;
float4x4 sc_ModelViewProjectionMatrixArray[2];
float4x4 sc_ModelViewProjectionMatrixInverseArray[2];
float4x4 sc_ViewProjectionMatrixArray[2];
float4x4 sc_ViewProjectionMatrixInverseArray[2];
float4x4 sc_ModelViewMatrixArray[2];
float4x4 sc_ModelViewMatrixInverseArray[2];
float3x3 sc_ViewNormalMatrixArray[2];
float3x3 sc_ViewNormalMatrixInverseArray[2];
float4x4 sc_ProjectionMatrixArray[2];
float4x4 sc_ProjectionMatrixInverseArray[2];
float4x4 sc_ViewMatrixArray[2];
float4x4 sc_ViewMatrixInverseArray[2];
float4x4 sc_PrevFrameViewProjectionMatrixArray[2];
float4x4 sc_ModelMatrix;
float4x4 sc_ModelMatrixInverse;
float3x3 sc_NormalMatrix;
float3x3 sc_NormalMatrixInverse;
float4x4 sc_PrevFrameModelMatrix;
float4x4 sc_PrevFrameModelMatrixInverse;
float3 sc_LocalAabbMin;
float3 sc_LocalAabbMax;
float3 sc_WorldAabbMin;
float3 sc_WorldAabbMax;
float4 sc_WindowToViewportTransform;
float4 sc_CurrentRenderTargetDims;
sc_Camera_t sc_Camera;
float sc_ShadowDensity;
float4 sc_ShadowColor;
float4x4 sc_ProjectorMatrix;
float _sc_GetFramebufferColorInvalidUsageMarker;
float shaderComplexityValue;
float sc_DisableFrustumCullingMarker;
float4 weights0;
float4 weights1;
float4 weights2;
float4 sc_StereoClipPlanes[2];
int sc_FallbackInstanceID;
float _sc_framebufferFetchMarker;
float2 sc_TAAJitterOffset;
float strandWidth;
float strandTaper;
float4 sc_StrandDataMapTextureSize;
float clumpInstanceCount;
float clumpRadius;
float clumpTipScale;
float hairstyleInstanceCount;
float hairstyleNoise;
float4 sc_ScreenTextureSize;
float4 sc_ScreenTextureDims;
float4 sc_ScreenTextureView;
int receivesRayTracedReflections;
int receivesRayTracedShadows;
int receivesRayTracedDiffuseIndirect;
int receivesRayTracedAo;
float4 sc_RayTracedReflectionTextureSize;
float4 sc_RayTracedReflectionTextureDims;
float4 sc_RayTracedReflectionTextureView;
float4 sc_RayTracedShadowTextureSize;
float4 sc_RayTracedShadowTextureDims;
float4 sc_RayTracedShadowTextureView;
float4 sc_RayTracedDiffIndTextureSize;
float4 sc_RayTracedDiffIndTextureDims;
float4 sc_RayTracedDiffIndTextureView;
float4 sc_RayTracedAoTextureSize;
float4 sc_RayTracedAoTextureDims;
float4 sc_RayTracedAoTextureView;
float receiver_mask;
float3 OriginNormalizationScale;
float3 OriginNormalizationScaleInv;
float3 OriginNormalizationOffset;
int receiverId;
float correctedIntensity;
float4 intensityTextureSize;
float4 intensityTextureDims;
float4 intensityTextureView;
float3x3 intensityTextureTransform;
float4 intensityTextureUvMinMax;
float4 intensityTextureBorderColor;
float reflBlurWidth;
float reflBlurMinRough;
float reflBlurMaxRough;
int overrideTimeEnabled;
float overrideTimeElapsed[32];
float overrideTimeDelta;
int PreviewEnabled;
int PreviewNodeID;
float alphaTestThreshold;
float4 baseColor;
float Port_Value_N044;
float Port_Multiplier_N086;
float Port_Value_N073;
float Port_Scale_N083;
float Port_RangeMinB_N085;
float Port_RangeMaxB_N085;
float Port_Input1_N045;
float Port_Input1_N046;
float2 Port_Input1_N041;
float2 Port_Input1_N099;
float Port_Value2_N100;
float Port_Opacity_N000;
float3 Port_Emissive_N000;
float Port_Value_N001;
float Port_Value_N002;
float3 Port_AO_N000;
float3 Port_SpecularAO_N000;
float Port_Input1_N105;
};
struct sc_Bone_t
{
float4 boneMatrix[3];
float4 normalMatrix[3];
};
struct sc_Bones_obj
{
sc_Bone_t sc_Bones[1];
};
struct ssPreviewInfo
{
float4 Color;
bool Saved;
};
struct sc_Set0
{
constant sc_Bones_obj* sc_BonesUBO [[id(0)]];
texture2d<float> intensityTexture [[id(1)]];
texture2d<float> sc_EnvmapDiffuse [[id(2)]];
texture2d<float> sc_EnvmapSpecular [[id(3)]];
texture2d<float> sc_RayTracedAoTexture [[id(12)]];
texture2d<float> sc_RayTracedDiffIndTexture [[id(13)]];
texture2d<float> sc_RayTracedReflectionTexture [[id(14)]];
texture2d<float> sc_RayTracedShadowTexture [[id(15)]];
texture2d<float> sc_SSAOTexture [[id(16)]];
texture2d<float> sc_ScreenTexture [[id(17)]];
texture2d<float> sc_ShadowTexture [[id(18)]];
sampler intensityTextureSmpSC [[id(20)]];
sampler sc_EnvmapDiffuseSmpSC [[id(21)]];
sampler sc_EnvmapSpecularSmpSC [[id(22)]];
sampler sc_RayTracedAoTextureSmpSC [[id(24)]];
sampler sc_RayTracedDiffIndTextureSmpSC [[id(25)]];
sampler sc_RayTracedReflectionTextureSmpSC [[id(26)]];
sampler sc_RayTracedShadowTextureSmpSC [[id(27)]];
sampler sc_SSAOTextureSmpSC [[id(28)]];
sampler sc_ScreenTextureSmpSC [[id(29)]];
sampler sc_ShadowTextureSmpSC [[id(30)]];
constant userUniformsObj* UserUniforms [[id(32)]];
};
struct main_vert_out
{
float3 varPos [[user(locn0)]];
float3 varNormal [[user(locn1)]];
float4 varTangent [[user(locn2)]];
float4 varPackedTex [[user(locn3)]];
float4 varScreenPos [[user(locn4)]];
float2 varScreenTexturePos [[user(locn5)]];
float varViewSpaceDepth [[user(locn6)]];
float2 varShadowTex [[user(locn7)]];
int varStereoViewID [[user(locn8)]];
float varClipDistance [[user(locn9)]];
float4 varColor [[user(locn10)]];
float4 PreviewVertexColor [[user(locn11)]];
float PreviewVertexSaved [[user(locn12)]];
float4 gl_Position [[position]];
};
struct main_vert_in
{
float4 position [[attribute(0)]];
float3 normal [[attribute(1)]];
float4 tangent [[attribute(2)]];
float2 texture0 [[attribute(3)]];
float2 texture1 [[attribute(4)]];
float4 boneData [[attribute(5)]];
float3 blendShape0Pos [[attribute(6)]];
float3 blendShape1Pos [[attribute(7)]];
float3 blendShape2Pos [[attribute(8)]];
float3 blendShape3Pos [[attribute(9)]];
float3 blendShape4Pos [[attribute(10)]];
float3 blendShape5Pos [[attribute(11)]];
float3 blendShape0Normal [[attribute(12)]];
float3 blendShape1Normal [[attribute(13)]];
float3 blendShape2Normal [[attribute(14)]];
float3 positionNext [[attribute(15)]];
float3 positionPrevious [[attribute(16)]];
float4 strandProperties [[attribute(17)]];
float4 color [[attribute(18)]];
float spritetimestamp [[attribute(19)]];
float spriteindex [[attribute(20)]];
};
vertex main_vert_out main_vert(main_vert_in in [[stage_in]],constant sc_Set0& sc_set0 [[buffer(0)]],uint gl_InstanceIndex [[instance_id]])
{
main_vert_out out={};
out.PreviewVertexColor=float4(0.5);
ssPreviewInfo PreviewInfo;
PreviewInfo.Color=float4(0.5);
PreviewInfo.Saved=false;
out.PreviewVertexSaved=0.0;
sc_Vertex_t l9_0;
l9_0.position=in.position;
l9_0.normal=in.normal;
l9_0.tangent=in.tangent.xyz;
l9_0.texture0=in.texture0;
l9_0.texture1=in.texture1;
sc_Vertex_t l9_1=l9_0;
sc_Vertex_t param=l9_1;
sc_Vertex_t l9_2=param;
if ((int(sc_VertexBlending_tmp)!=0))
{
if ((int(sc_VertexBlendingUseNormals_tmp)!=0))
{
sc_Vertex_t l9_3=l9_2;
float3 l9_4=in.blendShape0Pos;
float3 l9_5=in.blendShape0Normal;
float l9_6=(*sc_set0.UserUniforms).weights0.x;
sc_Vertex_t l9_7=l9_3;
float3 l9_8=l9_4;
float l9_9=l9_6;
float3 l9_10=l9_7.position.xyz+(l9_8*l9_9);
l9_7.position=float4(l9_10.x,l9_10.y,l9_10.z,l9_7.position.w);
l9_3=l9_7;
l9_3.normal+=(l9_5*l9_6);
l9_2=l9_3;
sc_Vertex_t l9_11=l9_2;
float3 l9_12=in.blendShape1Pos;
float3 l9_13=in.blendShape1Normal;
float l9_14=(*sc_set0.UserUniforms).weights0.y;
sc_Vertex_t l9_15=l9_11;
float3 l9_16=l9_12;
float l9_17=l9_14;
float3 l9_18=l9_15.position.xyz+(l9_16*l9_17);
l9_15.position=float4(l9_18.x,l9_18.y,l9_18.z,l9_15.position.w);
l9_11=l9_15;
l9_11.normal+=(l9_13*l9_14);
l9_2=l9_11;
sc_Vertex_t l9_19=l9_2;
float3 l9_20=in.blendShape2Pos;
float3 l9_21=in.blendShape2Normal;
float l9_22=(*sc_set0.UserUniforms).weights0.z;
sc_Vertex_t l9_23=l9_19;
float3 l9_24=l9_20;
float l9_25=l9_22;
float3 l9_26=l9_23.position.xyz+(l9_24*l9_25);
l9_23.position=float4(l9_26.x,l9_26.y,l9_26.z,l9_23.position.w);
l9_19=l9_23;
l9_19.normal+=(l9_21*l9_22);
l9_2=l9_19;
}
else
{
sc_Vertex_t l9_27=l9_2;
float3 l9_28=in.blendShape0Pos;
float l9_29=(*sc_set0.UserUniforms).weights0.x;
float3 l9_30=l9_27.position.xyz+(l9_28*l9_29);
l9_27.position=float4(l9_30.x,l9_30.y,l9_30.z,l9_27.position.w);
l9_2=l9_27;
sc_Vertex_t l9_31=l9_2;
float3 l9_32=in.blendShape1Pos;
float l9_33=(*sc_set0.UserUniforms).weights0.y;
float3 l9_34=l9_31.position.xyz+(l9_32*l9_33);
l9_31.position=float4(l9_34.x,l9_34.y,l9_34.z,l9_31.position.w);
l9_2=l9_31;
sc_Vertex_t l9_35=l9_2;
float3 l9_36=in.blendShape2Pos;
float l9_37=(*sc_set0.UserUniforms).weights0.z;
float3 l9_38=l9_35.position.xyz+(l9_36*l9_37);
l9_35.position=float4(l9_38.x,l9_38.y,l9_38.z,l9_35.position.w);
l9_2=l9_35;
sc_Vertex_t l9_39=l9_2;
float3 l9_40=in.blendShape3Pos;
float l9_41=(*sc_set0.UserUniforms).weights0.w;
float3 l9_42=l9_39.position.xyz+(l9_40*l9_41);
l9_39.position=float4(l9_42.x,l9_42.y,l9_42.z,l9_39.position.w);
l9_2=l9_39;
sc_Vertex_t l9_43=l9_2;
float3 l9_44=in.blendShape4Pos;
float l9_45=(*sc_set0.UserUniforms).weights1.x;
float3 l9_46=l9_43.position.xyz+(l9_44*l9_45);
l9_43.position=float4(l9_46.x,l9_46.y,l9_46.z,l9_43.position.w);
l9_2=l9_43;
sc_Vertex_t l9_47=l9_2;
float3 l9_48=in.blendShape5Pos;
float l9_49=(*sc_set0.UserUniforms).weights1.y;
float3 l9_50=l9_47.position.xyz+(l9_48*l9_49);
l9_47.position=float4(l9_50.x,l9_50.y,l9_50.z,l9_47.position.w);
l9_2=l9_47;
}
}
param=l9_2;
sc_Vertex_t l9_51=param;
if (sc_SkinBonesCount_tmp>0)
{
float4 l9_52=float4(0.0);
if (sc_SkinBonesCount_tmp>0)
{
l9_52=float4(1.0,fract(in.boneData.yzw));
l9_52.x-=dot(l9_52.yzw,float3(1.0));
}
float4 l9_53=l9_52;
float4 l9_54=l9_53;
int l9_55=int(in.boneData.x);
int l9_56=int(in.boneData.y);
int l9_57=int(in.boneData.z);
int l9_58=int(in.boneData.w);
int l9_59=l9_55;
float4 l9_60=l9_51.position;
float3 l9_61=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_62=l9_59;
float4 l9_63=(*sc_set0.sc_BonesUBO).sc_Bones[l9_62].boneMatrix[0];
float4 l9_64=(*sc_set0.sc_BonesUBO).sc_Bones[l9_62].boneMatrix[1];
float4 l9_65=(*sc_set0.sc_BonesUBO).sc_Bones[l9_62].boneMatrix[2];
float4 l9_66[3];
l9_66[0]=l9_63;
l9_66[1]=l9_64;
l9_66[2]=l9_65;
l9_61=float3(dot(l9_60,l9_66[0]),dot(l9_60,l9_66[1]),dot(l9_60,l9_66[2]));
}
else
{
l9_61=l9_60.xyz;
}
float3 l9_67=l9_61;
float3 l9_68=l9_67;
float l9_69=l9_54.x;
int l9_70=l9_56;
float4 l9_71=l9_51.position;
float3 l9_72=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_73=l9_70;
float4 l9_74=(*sc_set0.sc_BonesUBO).sc_Bones[l9_73].boneMatrix[0];
float4 l9_75=(*sc_set0.sc_BonesUBO).sc_Bones[l9_73].boneMatrix[1];
float4 l9_76=(*sc_set0.sc_BonesUBO).sc_Bones[l9_73].boneMatrix[2];
float4 l9_77[3];
l9_77[0]=l9_74;
l9_77[1]=l9_75;
l9_77[2]=l9_76;
l9_72=float3(dot(l9_71,l9_77[0]),dot(l9_71,l9_77[1]),dot(l9_71,l9_77[2]));
}
else
{
l9_72=l9_71.xyz;
}
float3 l9_78=l9_72;
float3 l9_79=l9_78;
float l9_80=l9_54.y;
int l9_81=l9_57;
float4 l9_82=l9_51.position;
float3 l9_83=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_84=l9_81;
float4 l9_85=(*sc_set0.sc_BonesUBO).sc_Bones[l9_84].boneMatrix[0];
float4 l9_86=(*sc_set0.sc_BonesUBO).sc_Bones[l9_84].boneMatrix[1];
float4 l9_87=(*sc_set0.sc_BonesUBO).sc_Bones[l9_84].boneMatrix[2];
float4 l9_88[3];
l9_88[0]=l9_85;
l9_88[1]=l9_86;
l9_88[2]=l9_87;
l9_83=float3(dot(l9_82,l9_88[0]),dot(l9_82,l9_88[1]),dot(l9_82,l9_88[2]));
}
else
{
l9_83=l9_82.xyz;
}
float3 l9_89=l9_83;
float3 l9_90=l9_89;
float l9_91=l9_54.z;
int l9_92=l9_58;
float4 l9_93=l9_51.position;
float3 l9_94=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_95=l9_92;
float4 l9_96=(*sc_set0.sc_BonesUBO).sc_Bones[l9_95].boneMatrix[0];
float4 l9_97=(*sc_set0.sc_BonesUBO).sc_Bones[l9_95].boneMatrix[1];
float4 l9_98=(*sc_set0.sc_BonesUBO).sc_Bones[l9_95].boneMatrix[2];
float4 l9_99[3];
l9_99[0]=l9_96;
l9_99[1]=l9_97;
l9_99[2]=l9_98;
l9_94=float3(dot(l9_93,l9_99[0]),dot(l9_93,l9_99[1]),dot(l9_93,l9_99[2]));
}
else
{
l9_94=l9_93.xyz;
}
float3 l9_100=l9_94;
float3 l9_101=(((l9_68*l9_69)+(l9_79*l9_80))+(l9_90*l9_91))+(l9_100*l9_54.w);
l9_51.position=float4(l9_101.x,l9_101.y,l9_101.z,l9_51.position.w);
int l9_102=l9_55;
float3x3 l9_103=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_102].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_102].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_102].normalMatrix[2].xyz));
float3x3 l9_104=l9_103;
float3x3 l9_105=l9_104;
int l9_106=l9_56;
float3x3 l9_107=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_106].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_106].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_106].normalMatrix[2].xyz));
float3x3 l9_108=l9_107;
float3x3 l9_109=l9_108;
int l9_110=l9_57;
float3x3 l9_111=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_110].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_110].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_110].normalMatrix[2].xyz));
float3x3 l9_112=l9_111;
float3x3 l9_113=l9_112;
int l9_114=l9_58;
float3x3 l9_115=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_114].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_114].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_114].normalMatrix[2].xyz));
float3x3 l9_116=l9_115;
float3x3 l9_117=l9_116;
l9_51.normal=((((l9_105*l9_51.normal)*l9_54.x)+((l9_109*l9_51.normal)*l9_54.y))+((l9_113*l9_51.normal)*l9_54.z))+((l9_117*l9_51.normal)*l9_54.w);
l9_51.tangent=((((l9_105*l9_51.tangent)*l9_54.x)+((l9_109*l9_51.tangent)*l9_54.y))+((l9_113*l9_51.tangent)*l9_54.z))+((l9_117*l9_51.tangent)*l9_54.w);
}
param=l9_51;
if (sc_RenderingSpace_tmp==3)
{
out.varPos=float3(0.0);
out.varNormal=param.normal;
out.varTangent=float4(param.tangent.x,param.tangent.y,param.tangent.z,out.varTangent.w);
}
else
{
if (sc_RenderingSpace_tmp==4)
{
out.varPos=float3(0.0);
out.varNormal=param.normal;
out.varTangent=float4(param.tangent.x,param.tangent.y,param.tangent.z,out.varTangent.w);
}
else
{
if (sc_RenderingSpace_tmp==2)
{
out.varPos=param.position.xyz;
out.varNormal=param.normal;
out.varTangent=float4(param.tangent.x,param.tangent.y,param.tangent.z,out.varTangent.w);
}
else
{
if (sc_RenderingSpace_tmp==1)
{
out.varPos=((*sc_set0.UserUniforms).sc_ModelMatrix*param.position).xyz;
out.varNormal=(*sc_set0.UserUniforms).sc_NormalMatrix*param.normal;
float3 l9_118=(*sc_set0.UserUniforms).sc_NormalMatrix*param.tangent;
out.varTangent=float4(l9_118.x,l9_118.y,l9_118.z,out.varTangent.w);
}
}
}
}
if ((*sc_set0.UserUniforms).PreviewEnabled==1)
{
param.texture0.x=1.0-param.texture0.x;
}
out.varColor=in.color;
sc_Vertex_t v=param;
ssGlobals Globals;
Globals.gTimeElapsed=(*sc_set0.UserUniforms).sc_Time.x;
Globals.gTimeDelta=(*sc_set0.UserUniforms).sc_Time.y;
Globals.Surface_UVCoord0=v.texture0;
Globals.SurfacePosition_ObjectSpace=((*sc_set0.UserUniforms).sc_ModelMatrixInverse*float4(out.varPos,1.0)).xyz;
float3 WorldPosition=out.varPos;
float3 WorldNormal=out.varNormal;
float3 WorldTangent=out.varTangent.xyz;
float3 Camera_Up_N75=float3(0.0);
int l9_119=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_119=0;
}
else
{
l9_119=gl_InstanceIndex%2;
}
int l9_120=l9_119;
Camera_Up_N75=normalize((*sc_set0.UserUniforms).sc_ViewMatrixInverseArray[l9_120][1].xyz);
float Output_N44=0.0;
float param_1=(*sc_set0.UserUniforms).Port_Value_N044;
float param_2=param_1+0.001;
param_2-=0.001;
Output_N44=param_2;
float Time_N86=0.0;
Time_N86=Globals.gTimeElapsed*(*sc_set0.UserUniforms).Port_Multiplier_N086;
float _Attribute_N72=0.0;
float param_3=in.spritetimestamp;
_Attribute_N72=param_3;
float Output_N73=0.0;
float param_4=(*sc_set0.UserUniforms).Port_Value_N073;
float param_5=param_4+0.001;
param_5-=0.001;
Output_N73=param_5;
float _Attribute_N57=0.0;
float param_6=in.spriteindex;
_Attribute_N57=param_6;
float Random_N83=0.0;
float param_7=_Attribute_N57;
float param_8=(*sc_set0.UserUniforms).Port_Scale_N083;
param_7=floor(param_7*10000.0)*9.9999997e-05;
float param_9=floor(param_7*param_8);
param_9=floor(param_9*10000.0)*9.9999997e-05;
param_9=sin(param_9);
param_9*=437.58499;
param_9=fract(param_9);
param_9=floor(param_9*10000.0)*9.9999997e-05;
Random_N83=param_9;
float Output_N84=0.0;
Output_N84=Output_N73*Random_N83;
float Output_N87=0.0;
Output_N87=_Attribute_N72+Output_N84;
float ValueOut_N85=0.0;
float param_10=Time_N86;
float param_12=_Attribute_N72;
float param_13=Output_N87;
float param_14=(*sc_set0.UserUniforms).Port_RangeMinB_N085;
float param_15=(*sc_set0.UserUniforms).Port_RangeMaxB_N085;
float param_11=(((param_10-param_12)/((param_13-param_12)+1e-06))*(param_15-param_14))+param_14;
float l9_121;
if (param_15>param_14)
{
l9_121=fast::clamp(param_11,param_14,param_15);
}
else
{
l9_121=fast::clamp(param_11,param_15,param_14);
}
param_11=l9_121;
ValueOut_N85=param_11;
float Output_N89=0.0;
Output_N89=Output_N44*ValueOut_N85;
float Output_N45=0.0;
Output_N45=Output_N89/(*sc_set0.UserUniforms).Port_Input1_N045;
float Output_N46=0.0;
Output_N46=Output_N45*(*sc_set0.UserUniforms).Port_Input1_N046;
float2 Output_N48=float2(0.0);
Output_N48=float2(Output_N46,Output_N46);
float2 UVCoord_N42=float2(0.0);
UVCoord_N42=Globals.Surface_UVCoord0;
float2 Output_N41=float2(0.0);
Output_N41=UVCoord_N42-(*sc_set0.UserUniforms).Port_Input1_N041;
float2 Output_N70=float2(0.0);
Output_N70=Output_N48*Output_N41;
float Output_N79=0.0;
Output_N79=Output_N70.y;
float3 Output_N76=float3(0.0);
Output_N76=Camera_Up_N75*float3(Output_N79);
float3 Camera_Right_N74=float3(0.0);
int l9_122=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_122=0;
}
else
{
l9_122=gl_InstanceIndex%2;
}
int l9_123=l9_122;
Camera_Right_N74=normalize((*sc_set0.UserUniforms).sc_ViewMatrixInverseArray[l9_123][0].xyz);
float Output_N78=0.0;
Output_N78=Output_N70.x;
float3 Output_N77=float3(0.0);
Output_N77=Camera_Right_N74*float3(Output_N78);
float3 Output_N80=float3(0.0);
Output_N80=Output_N76+Output_N77;
float3 Position_N47=float3(0.0);
Position_N47=Globals.SurfacePosition_ObjectSpace;
float3 Output_N81=float3(0.0);
Output_N81=Output_N80+Position_N47;
float3 VectorOut_N82=float3(0.0);
VectorOut_N82=((*sc_set0.UserUniforms).sc_ModelMatrix*float4(Output_N81,1.0)).xyz;
WorldPosition=VectorOut_N82;
float2 UVCoord_N42_1=float2(0.0);
UVCoord_N42_1=Globals.Surface_UVCoord0;
float2 Output_N41_1=float2(0.0);
Output_N41_1=UVCoord_N42_1-(*sc_set0.UserUniforms).Port_Input1_N041;
float2 Output_N99=float2(0.0);
Output_N99=Output_N41_1*(*sc_set0.UserUniforms).Port_Input1_N099;
float3 Value_N100=float3(0.0);
Value_N100=float3(Output_N99.x,Output_N99.y,Value_N100.z);
Value_N100.z=(*sc_set0.UserUniforms).Port_Value2_N100;
float3 Output_N101=float3(0.0);
float3 param_16=Value_N100;
float l9_124=dot(param_16,param_16);
float l9_125;
if (l9_124>0.0)
{
l9_125=1.0/sqrt(l9_124);
}
else
{
l9_125=0.0;
}
float l9_126=l9_125;
float3 param_17=param_16*l9_126;
Output_N101=param_17;
float3 VectorOut_N106=float3(0.0);
VectorOut_N106=((*sc_set0.UserUniforms).sc_ModelMatrix*float4(Output_N101,1.0)).xyz;
WorldNormal=VectorOut_N106;
if ((*sc_set0.UserUniforms).PreviewEnabled==1)
{
WorldPosition=out.varPos;
WorldNormal=out.varNormal;
WorldTangent=out.varTangent.xyz;
}
sc_Vertex_t param_18=v;
float3 param_19=WorldPosition;
float3 param_20=WorldNormal;
float3 param_21=WorldTangent;
float4 param_22=v.position;
out.varPos=param_19;
out.varNormal=normalize(param_20);
float3 l9_127=normalize(param_21);
out.varTangent=float4(l9_127.x,l9_127.y,l9_127.z,out.varTangent.w);
out.varTangent.w=in.tangent.w;
if ((int(UseViewSpaceDepthVariant_tmp)!=0)&&(((int(sc_OITDepthGatherPass_tmp)!=0)||(int(sc_OITCompositingPass_tmp)!=0))||(int(sc_OITDepthBoundsPass_tmp)!=0)))
{
float4 l9_128=param_18.position;
float4 l9_129=float4(0.0);
if (sc_RenderingSpace_tmp==3)
{
int l9_130=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_130=0;
}
else
{
l9_130=gl_InstanceIndex%2;
}
int l9_131=l9_130;
l9_129=(*sc_set0.UserUniforms).sc_ProjectionMatrixInverseArray[l9_131]*l9_128;
}
else
{
if (sc_RenderingSpace_tmp==2)
{
int l9_132=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_132=0;
}
else
{
l9_132=gl_InstanceIndex%2;
}
int l9_133=l9_132;
l9_129=(*sc_set0.UserUniforms).sc_ViewMatrixArray[l9_133]*l9_128;
}
else
{
if (sc_RenderingSpace_tmp==1)
{
int l9_134=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_134=0;
}
else
{
l9_134=gl_InstanceIndex%2;
}
int l9_135=l9_134;
l9_129=(*sc_set0.UserUniforms).sc_ModelViewMatrixArray[l9_135]*l9_128;
}
else
{
l9_129=l9_128;
}
}
}
float4 l9_136=l9_129;
out.varViewSpaceDepth=-l9_136.z;
}
float4 l9_137=float4(0.0);
if (sc_RenderingSpace_tmp==3)
{
l9_137=param_22;
}
else
{
if (sc_RenderingSpace_tmp==4)
{
int l9_138=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_138=0;
}
else
{
l9_138=gl_InstanceIndex%2;
}
int l9_139=l9_138;
l9_137=((*sc_set0.UserUniforms).sc_ModelViewMatrixArray[l9_139]*param_18.position)*float4(1.0/(*sc_set0.UserUniforms).sc_Camera.aspect,1.0,1.0,1.0);
}
else
{
if (sc_RenderingSpace_tmp==2)
{
int l9_140=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_140=0;
}
else
{
l9_140=gl_InstanceIndex%2;
}
int l9_141=l9_140;
l9_137=(*sc_set0.UserUniforms).sc_ViewProjectionMatrixArray[l9_141]*float4(out.varPos,1.0);
}
else
{
if (sc_RenderingSpace_tmp==1)
{
int l9_142=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_142=0;
}
else
{
l9_142=gl_InstanceIndex%2;
}
int l9_143=l9_142;
l9_137=(*sc_set0.UserUniforms).sc_ViewProjectionMatrixArray[l9_143]*float4(out.varPos,1.0);
}
}
}
}
out.varPackedTex=float4(param_18.texture0,param_18.texture1);
if ((int(sc_ProjectiveShadowsReceiver_tmp)!=0))
{
float4 l9_144=param_18.position;
float4 l9_145=l9_144;
if (sc_RenderingSpace_tmp==1)
{
l9_145=(*sc_set0.UserUniforms).sc_ModelMatrix*l9_144;
}
float4 l9_146=(*sc_set0.UserUniforms).sc_ProjectorMatrix*l9_145;
float2 l9_147=((l9_146.xy/float2(l9_146.w))*0.5)+float2(0.5);
out.varShadowTex=l9_147;
}
float4 l9_148=l9_137;
if (sc_DepthBufferMode_tmp==1)
{
int l9_149=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_149=0;
}
else
{
l9_149=gl_InstanceIndex%2;
}
int l9_150=l9_149;
if ((*sc_set0.UserUniforms).sc_ProjectionMatrixArray[l9_150][2].w!=0.0)
{
float l9_151=2.0/log2((*sc_set0.UserUniforms).sc_Camera.clipPlanes.y+1.0);
l9_148.z=((log2(fast::max((*sc_set0.UserUniforms).sc_Camera.clipPlanes.x,1.0+l9_148.w))*l9_151)-1.0)*l9_148.w;
}
}
float4 l9_152=l9_148;
l9_137=l9_152;
float4 l9_153=l9_137;
if ((int(sc_TAAEnabled_tmp)!=0))
{
float2 l9_154=l9_153.xy+((*sc_set0.UserUniforms).sc_TAAJitterOffset*l9_153.w);
l9_153=float4(l9_154.x,l9_154.y,l9_153.z,l9_153.w);
}
float4 l9_155=l9_153;
l9_137=l9_155;
float4 l9_156=l9_137;
if (sc_ShaderCacheConstant_tmp!=0)
{
l9_156.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
if (sc_StereoRenderingMode_tmp>0)
{
out.varStereoViewID=gl_InstanceIndex%2;
}
float4 l9_157=l9_156;
if (sc_StereoRenderingMode_tmp==1)
{
float l9_158=dot(l9_157,(*sc_set0.UserUniforms).sc_StereoClipPlanes[gl_InstanceIndex%2]);
float l9_159=l9_158;
if (sc_StereoRendering_IsClipDistanceEnabled_tmp==1)
{
}
else
{
out.varClipDistance=l9_159;
}
}
float4 l9_160=float4(l9_156.x,-l9_156.y,(l9_156.z*0.5)+(l9_156.w*0.5),l9_156.w);
out.gl_Position=l9_160;
v=param_18;
if (PreviewInfo.Saved)
{
out.PreviewVertexColor=float4(PreviewInfo.Color.xyz,1.0);
out.PreviewVertexSaved=1.0;
}
return out;
}
} // VERTEX SHADER


namespace SNAP_FS {
struct SurfaceProperties
{
float3 albedo;
float opacity;
float3 normal;
float3 positionWS;
float3 viewDirWS;
float metallic;
float roughness;
float3 emissive;
float3 ao;
float3 specularAo;
float3 bakedShadows;
float3 specColor;
};
struct LightingComponents
{
float3 directDiffuse;
float3 directSpecular;
float3 indirectDiffuse;
float3 indirectSpecular;
float3 emitted;
float3 transmitted;
};
struct LightProperties
{
float3 direction;
float3 color;
float attenuation;
};
struct sc_SphericalGaussianLight_t
{
float3 color;
float sharpness;
float3 axis;
};
struct ssGlobals
{
float gTimeElapsed;
float gTimeDelta;
float gTimeElapsedShifted;
float3 BumpedNormal;
float3 ViewDirWS;
float3 PositionWS;
float2 Surface_UVCoord0;
};
struct sc_PointLight_t
{
int falloffEnabled;
float falloffEndDistance;
float negRcpFalloffEndDistance4;
float angleScale;
float angleOffset;
float3 direction;
float3 position;
float4 color;
};
struct sc_DirectionalLight_t
{
float3 direction;
float4 color;
};
struct sc_AmbientLight_t
{
float3 color;
float intensity;
};
struct sc_LightEstimationData_t
{
sc_SphericalGaussianLight_t sg[12];
float3 ambientLight;
};
struct sc_Camera_t
{
float3 position;
float aspect;
float2 clipPlanes;
};
struct userUniformsObj
{
sc_PointLight_t sc_PointLights[3];
sc_DirectionalLight_t sc_DirectionalLights[5];
sc_AmbientLight_t sc_AmbientLights[3];
sc_LightEstimationData_t sc_LightEstimationData;
float4 sc_EnvmapDiffuseSize;
float4 sc_EnvmapDiffuseDims;
float4 sc_EnvmapDiffuseView;
float4 sc_EnvmapSpecularSize;
float4 sc_EnvmapSpecularDims;
float4 sc_EnvmapSpecularView;
float3 sc_EnvmapRotation;
float sc_EnvmapExposure;
float3 sc_Sh[9];
float sc_ShIntensity;
float4 sc_Time;
float4 sc_UniformConstants;
float4 sc_GeometryInfo;
float4x4 sc_ModelViewProjectionMatrixArray[2];
float4x4 sc_ModelViewProjectionMatrixInverseArray[2];
float4x4 sc_ViewProjectionMatrixArray[2];
float4x4 sc_ViewProjectionMatrixInverseArray[2];
float4x4 sc_ModelViewMatrixArray[2];
float4x4 sc_ModelViewMatrixInverseArray[2];
float3x3 sc_ViewNormalMatrixArray[2];
float3x3 sc_ViewNormalMatrixInverseArray[2];
float4x4 sc_ProjectionMatrixArray[2];
float4x4 sc_ProjectionMatrixInverseArray[2];
float4x4 sc_ViewMatrixArray[2];
float4x4 sc_ViewMatrixInverseArray[2];
float4x4 sc_PrevFrameViewProjectionMatrixArray[2];
float4x4 sc_ModelMatrix;
float4x4 sc_ModelMatrixInverse;
float3x3 sc_NormalMatrix;
float3x3 sc_NormalMatrixInverse;
float4x4 sc_PrevFrameModelMatrix;
float4x4 sc_PrevFrameModelMatrixInverse;
float3 sc_LocalAabbMin;
float3 sc_LocalAabbMax;
float3 sc_WorldAabbMin;
float3 sc_WorldAabbMax;
float4 sc_WindowToViewportTransform;
float4 sc_CurrentRenderTargetDims;
sc_Camera_t sc_Camera;
float sc_ShadowDensity;
float4 sc_ShadowColor;
float4x4 sc_ProjectorMatrix;
float _sc_GetFramebufferColorInvalidUsageMarker;
float shaderComplexityValue;
float sc_DisableFrustumCullingMarker;
float4 weights0;
float4 weights1;
float4 weights2;
float4 sc_StereoClipPlanes[2];
int sc_FallbackInstanceID;
float _sc_framebufferFetchMarker;
float2 sc_TAAJitterOffset;
float strandWidth;
float strandTaper;
float4 sc_StrandDataMapTextureSize;
float clumpInstanceCount;
float clumpRadius;
float clumpTipScale;
float hairstyleInstanceCount;
float hairstyleNoise;
float4 sc_ScreenTextureSize;
float4 sc_ScreenTextureDims;
float4 sc_ScreenTextureView;
int receivesRayTracedReflections;
int receivesRayTracedShadows;
int receivesRayTracedDiffuseIndirect;
int receivesRayTracedAo;
float4 sc_RayTracedReflectionTextureSize;
float4 sc_RayTracedReflectionTextureDims;
float4 sc_RayTracedReflectionTextureView;
float4 sc_RayTracedShadowTextureSize;
float4 sc_RayTracedShadowTextureDims;
float4 sc_RayTracedShadowTextureView;
float4 sc_RayTracedDiffIndTextureSize;
float4 sc_RayTracedDiffIndTextureDims;
float4 sc_RayTracedDiffIndTextureView;
float4 sc_RayTracedAoTextureSize;
float4 sc_RayTracedAoTextureDims;
float4 sc_RayTracedAoTextureView;
float receiver_mask;
float3 OriginNormalizationScale;
float3 OriginNormalizationScaleInv;
float3 OriginNormalizationOffset;
int receiverId;
float correctedIntensity;
float4 intensityTextureSize;
float4 intensityTextureDims;
float4 intensityTextureView;
float3x3 intensityTextureTransform;
float4 intensityTextureUvMinMax;
float4 intensityTextureBorderColor;
float reflBlurWidth;
float reflBlurMinRough;
float reflBlurMaxRough;
int overrideTimeEnabled;
float overrideTimeElapsed[32];
float overrideTimeDelta;
int PreviewEnabled;
int PreviewNodeID;
float alphaTestThreshold;
float4 baseColor;
float Port_Value_N044;
float Port_Multiplier_N086;
float Port_Value_N073;
float Port_Scale_N083;
float Port_RangeMinB_N085;
float Port_RangeMaxB_N085;
float Port_Input1_N045;
float Port_Input1_N046;
float2 Port_Input1_N041;
float2 Port_Input1_N099;
float Port_Value2_N100;
float Port_Opacity_N000;
float3 Port_Emissive_N000;
float Port_Value_N001;
float Port_Value_N002;
float3 Port_AO_N000;
float3 Port_SpecularAO_N000;
float Port_Input1_N105;
};
struct sc_PointLight_t_1
{
bool falloffEnabled;
float falloffEndDistance;
float negRcpFalloffEndDistance4;
float angleScale;
float angleOffset;
float3 direction;
float3 position;
float4 color;
};
struct ssPreviewInfo
{
float4 Color;
bool Saved;
};
struct sc_Bone_t
{
float4 boneMatrix[3];
float4 normalMatrix[3];
};
struct sc_Bones_obj
{
sc_Bone_t sc_Bones[1];
};
struct sc_Set0
{
constant sc_Bones_obj* sc_BonesUBO [[id(0)]];
texture2d<float> intensityTexture [[id(1)]];
texture2d<float> sc_EnvmapDiffuse [[id(2)]];
texture2d<float> sc_EnvmapSpecular [[id(3)]];
texture2d<float> sc_RayTracedAoTexture [[id(12)]];
texture2d<float> sc_RayTracedDiffIndTexture [[id(13)]];
texture2d<float> sc_RayTracedReflectionTexture [[id(14)]];
texture2d<float> sc_RayTracedShadowTexture [[id(15)]];
texture2d<float> sc_SSAOTexture [[id(16)]];
texture2d<float> sc_ScreenTexture [[id(17)]];
texture2d<float> sc_ShadowTexture [[id(18)]];
sampler intensityTextureSmpSC [[id(20)]];
sampler sc_EnvmapDiffuseSmpSC [[id(21)]];
sampler sc_EnvmapSpecularSmpSC [[id(22)]];
sampler sc_RayTracedAoTextureSmpSC [[id(24)]];
sampler sc_RayTracedDiffIndTextureSmpSC [[id(25)]];
sampler sc_RayTracedReflectionTextureSmpSC [[id(26)]];
sampler sc_RayTracedShadowTextureSmpSC [[id(27)]];
sampler sc_SSAOTextureSmpSC [[id(28)]];
sampler sc_ScreenTextureSmpSC [[id(29)]];
sampler sc_ShadowTextureSmpSC [[id(30)]];
constant userUniformsObj* UserUniforms [[id(32)]];
};
struct main_frag_out
{
float4 FragColor0 [[color(0)]];
float4 FragColor1 [[color(1)]];
float4 FragColor2 [[color(2)]];
float4 FragColor3 [[color(3)]];
};
struct main_frag_in
{
float3 varPos [[user(locn0)]];
float3 varNormal [[user(locn1)]];
float4 varTangent [[user(locn2)]];
float4 varPackedTex [[user(locn3)]];
float4 varScreenPos [[user(locn4)]];
float2 varScreenTexturePos [[user(locn5)]];
float varViewSpaceDepth [[user(locn6)]];
float2 varShadowTex [[user(locn7)]];
int varStereoViewID [[user(locn8)]];
float varClipDistance [[user(locn9)]];
float4 varColor [[user(locn10)]];
float4 PreviewVertexColor [[user(locn11)]];
float PreviewVertexSaved [[user(locn12)]];
};
// Implementation of the GLSL mod() function,which is slightly different than Metal fmod()
template<typename Tx,typename Ty>
Tx mod(Tx x,Ty y)
{
return x-y*floor(x/y);
}
float3 evaluateSSAO(thread const float3& positionWS,thread int& varStereoViewID,constant userUniformsObj& UserUniforms,thread texture2d<float> sc_SSAOTexture,thread sampler sc_SSAOTextureSmpSC)
{
if ((int(sc_SSAOEnabled_tmp)!=0))
{
int l9_0=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_0=0;
}
else
{
l9_0=varStereoViewID;
}
int l9_1=l9_0;
float4 clipSpaceCoord=UserUniforms.sc_ViewProjectionMatrixArray[l9_1]*float4(positionWS,1.0);
float3 l9_2=clipSpaceCoord.xyz/float3(clipSpaceCoord.w);
clipSpaceCoord=float4(l9_2.x,l9_2.y,l9_2.z,clipSpaceCoord.w);
float4 shadowSample=sc_SSAOTexture.sample(sc_SSAOTextureSmpSC,((clipSpaceCoord.xy*0.5)+float2(0.5)));
return float3(shadowSample.x);
}
else
{
return float3(1.0);
}
}
float3 calculateDirectSpecular(thread const SurfaceProperties& surfaceProperties,thread const float3& L,thread const float3& V)
{
float r=fast::max(surfaceProperties.roughness,0.029999999);
float3 F0=surfaceProperties.specColor;
float3 N=surfaceProperties.normal;
float3 H=normalize(L+V);
float param=dot(N,L);
float l9_0=fast::clamp(param,0.0,1.0);
float NdotL=l9_0;
float param_1=dot(N,V);
float l9_1=fast::clamp(param_1,0.0,1.0);
float NdotV=l9_1;
float param_2=dot(N,H);
float l9_2=fast::clamp(param_2,0.0,1.0);
float NdotH=l9_2;
float param_3=dot(V,H);
float l9_3=fast::clamp(param_3,0.0,1.0);
float VdotH=l9_3;
if (SC_DEVICE_CLASS_tmp>=2)
{
float param_4=NdotH;
float param_5=r;
float l9_4=param_5*param_5;
float l9_5=l9_4*l9_4;
float l9_6=param_4*param_4;
float l9_7=(l9_6*(l9_5-1.0))+1.0;
float l9_8=l9_7*l9_7;
float l9_9=9.9999999e-09;
float l9_10=l9_5/(l9_8+l9_9);
float param_6=NdotL;
float param_7=NdotV;
float param_8=r;
float l9_11=param_6;
float l9_12=param_8;
float l9_13=l9_12+1.0;
l9_13=(l9_13*l9_13)*0.125;
float l9_14=(l9_11*(1.0-l9_13))+l9_13;
float l9_15=param_7;
float l9_16=param_8;
float l9_17=l9_16+1.0;
l9_17=(l9_17*l9_17)*0.125;
float l9_18=(l9_15*(1.0-l9_17))+l9_17;
float l9_19=1.0/(l9_14*l9_18);
float param_9=VdotH;
float3 param_10=F0;
float l9_20=param_9;
float3 l9_21=param_10;
float3 l9_22=float3(1.0);
float l9_23=1.0-l9_20;
float l9_24=l9_23*l9_23;
float l9_25=(l9_24*l9_24)*l9_23;
float3 l9_26=l9_21+((l9_22-l9_21)*l9_25);
float3 l9_27=l9_26;
return l9_27*(((l9_10*l9_19)*0.25)*NdotL);
}
else
{
float specPower=exp2(11.0-(10.0*r));
float param_11=VdotH;
float3 param_12=F0;
float l9_28=param_11;
float3 l9_29=param_12;
float3 l9_30=float3(1.0);
float l9_31=1.0-l9_28;
float l9_32=l9_31*l9_31;
float l9_33=(l9_32*l9_32)*l9_31;
float3 l9_34=l9_29+((l9_30-l9_29)*l9_33);
float3 l9_35=l9_34;
return ((l9_35*((specPower*0.125)+0.25))*pow(NdotH,specPower))*NdotL;
}
}
float computeDistanceAttenuation(thread const float& distanceToLight,thread const float& falloffEndDistance)
{
float distanceToLightSquared=distanceToLight*distanceToLight;
if (falloffEndDistance==0.0)
{
return 1.0/distanceToLightSquared;
}
float distanceToLightToTheFourth=distanceToLightSquared*distanceToLightSquared;
float falloffEndDistanceToTheFourth=pow(falloffEndDistance,4.0);
return fast::max(fast::min(1.0-(distanceToLightToTheFourth/falloffEndDistanceToTheFourth),1.0),0.0)/distanceToLightSquared;
}
float2 calcSeamlessPanoramicUvsForSampling(thread const float2& uv,thread const float2& topMipRes,thread const float& lod)
{
if (SC_DEVICE_CLASS_tmp>=2)
{
float2 thisMipRes=fast::max(float2(1.0),topMipRes/float2(exp2(lod)));
return ((uv*(thisMipRes-float2(1.0)))/thisMipRes)+(float2(0.5)/thisMipRes);
}
else
{
return uv;
}
}
float4 sampleRayTracedIndirectDiffuse(thread int& varStereoViewID,constant userUniformsObj& UserUniforms,thread texture2d<float> sc_RayTracedDiffIndTexture,thread sampler sc_RayTracedDiffIndTextureSmpSC,thread float4& gl_FragCoord)
{
bool l9_0=UserUniforms.receivesRayTracedDiffuseIndirect!=0;
if (l9_0)
{
float4 l9_1=gl_FragCoord;
float2 l9_2=l9_1.xy*UserUniforms.sc_CurrentRenderTargetDims.zw;
float2 p=l9_2;
float2 param=p;
int l9_3=0;
if ((int(sc_RayTracedDiffIndTextureHasSwappedViews_tmp)!=0))
{
int l9_4=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_4=0;
}
else
{
l9_4=varStereoViewID;
}
int l9_5=l9_4;
l9_3=1-l9_5;
}
else
{
int l9_6=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_6=0;
}
else
{
l9_6=varStereoViewID;
}
int l9_7=l9_6;
l9_3=l9_7;
}
int l9_8=l9_3;
float2 l9_9=param;
int l9_10=l9_8;
float2 l9_11=l9_9;
int l9_12=l9_10;
float l9_13=0.0;
float4 l9_14=float4(0.0);
float2 l9_15=l9_11;
int l9_16=sc_RayTracedDiffIndTextureLayout_tmp;
int l9_17=l9_12;
float l9_18=l9_13;
float2 l9_19=l9_15;
int l9_20=l9_16;
int l9_21=l9_17;
float3 l9_22=float3(0.0);
if (l9_20==0)
{
l9_22=float3(l9_19,0.0);
}
else
{
if (l9_20==1)
{
l9_22=float3(l9_19.x,(l9_19.y*0.5)+(0.5-(float(l9_21)*0.5)),0.0);
}
else
{
l9_22=float3(l9_19,float(l9_21));
}
}
float3 l9_23=l9_22;
float3 l9_24=l9_23;
float2 l9_25=l9_24.xy;
float l9_26=l9_18;
float4 l9_27=sc_RayTracedDiffIndTexture.sample(sc_RayTracedDiffIndTextureSmpSC,l9_25,bias(l9_26));
float4 l9_28=l9_27;
l9_14=l9_28;
float4 l9_29=l9_14;
float4 l9_30=l9_29;
float4 l9_31=l9_30;
return l9_31;
}
return float4(0.0);
}
float3 getSpecularDominantDir(thread const float3& N,thread const float3& R,thread const float& roughness)
{
if (SC_DEVICE_CLASS_tmp>=2)
{
float lerpFactor=(roughness*roughness)*roughness;
return normalize(mix(R,N,float3(lerpFactor)));
}
else
{
return R;
}
}
float4 sampleRayTracedReflections(thread int& varStereoViewID,constant userUniformsObj& UserUniforms,thread texture2d<float> sc_RayTracedReflectionTexture,thread sampler sc_RayTracedReflectionTextureSmpSC,thread float4& gl_FragCoord)
{
bool l9_0=UserUniforms.receivesRayTracedReflections!=0;
if (!l9_0)
{
return float4(0.0);
}
else
{
float4 l9_1=gl_FragCoord;
float2 l9_2=l9_1.xy*UserUniforms.sc_CurrentRenderTargetDims.zw;
float2 p=l9_2;
float2 param=p;
int l9_3=0;
if ((int(sc_RayTracedReflectionTextureHasSwappedViews_tmp)!=0))
{
int l9_4=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_4=0;
}
else
{
l9_4=varStereoViewID;
}
int l9_5=l9_4;
l9_3=1-l9_5;
}
else
{
int l9_6=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_6=0;
}
else
{
l9_6=varStereoViewID;
}
int l9_7=l9_6;
l9_3=l9_7;
}
int l9_8=l9_3;
float2 l9_9=param;
int l9_10=l9_8;
float2 l9_11=l9_9;
int l9_12=l9_10;
float l9_13=0.0;
float4 l9_14=float4(0.0);
float2 l9_15=l9_11;
int l9_16=sc_RayTracedReflectionTextureLayout_tmp;
int l9_17=l9_12;
float l9_18=l9_13;
float2 l9_19=l9_15;
int l9_20=l9_16;
int l9_21=l9_17;
float3 l9_22=float3(0.0);
if (l9_20==0)
{
l9_22=float3(l9_19,0.0);
}
else
{
if (l9_20==1)
{
l9_22=float3(l9_19.x,(l9_19.y*0.5)+(0.5-(float(l9_21)*0.5)),0.0);
}
else
{
l9_22=float3(l9_19,float(l9_21));
}
}
float3 l9_23=l9_22;
float3 l9_24=l9_23;
float2 l9_25=l9_24.xy;
float l9_26=l9_18;
float4 l9_27=sc_RayTracedReflectionTexture.sample(sc_RayTracedReflectionTextureSmpSC,l9_25,bias(l9_26));
float4 l9_28=l9_27;
l9_14=l9_28;
float4 l9_29=l9_14;
float4 l9_30=l9_29;
float4 l9_31=l9_30;
return l9_31;
}
}
float3 envBRDFApprox(thread const SurfaceProperties& surfaceProperties,thread const float& NdotV)
{
if (SC_DEVICE_CLASS_tmp>=2)
{
float4 r=(float4(-1.0,-0.0275,-0.57200003,0.022)*surfaceProperties.roughness)+float4(1.0,0.0425,1.04,-0.039999999);
float a004=(fast::min(r.x*r.x,exp2((-9.2799997)*NdotV))*r.x)+r.y;
float2 AB=(float2(-1.04,1.04)*a004)+r.zw;
return fast::max((surfaceProperties.specColor*AB.x)+float3(AB.y),float3(0.0));
}
else
{
float3 fresnelMax=fast::max(float3(1.0-surfaceProperties.roughness),surfaceProperties.specColor);
float param=NdotV;
float3 param_1=surfaceProperties.specColor;
float3 param_2=fresnelMax;
float l9_0=1.0-param;
float l9_1=l9_0*l9_0;
float l9_2=(l9_1*l9_1)*l9_0;
float3 l9_3=param_1+((param_2-param_1)*l9_2);
return l9_3;
}
}
float sampleRayTracedAo(thread int& varStereoViewID,constant userUniformsObj& UserUniforms,thread texture2d<float> sc_RayTracedAoTexture,thread sampler sc_RayTracedAoTextureSmpSC,thread float4& gl_FragCoord)
{
bool l9_0=UserUniforms.receivesRayTracedAo!=0;
if (l9_0)
{
float4 l9_1=gl_FragCoord;
float2 l9_2=l9_1.xy*UserUniforms.sc_CurrentRenderTargetDims.zw;
float2 p=l9_2;
float2 param=p;
int l9_3=0;
if ((int(sc_RayTracedAoTextureHasSwappedViews_tmp)!=0))
{
int l9_4=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_4=0;
}
else
{
l9_4=varStereoViewID;
}
int l9_5=l9_4;
l9_3=1-l9_5;
}
else
{
int l9_6=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_6=0;
}
else
{
l9_6=varStereoViewID;
}
int l9_7=l9_6;
l9_3=l9_7;
}
int l9_8=l9_3;
float2 l9_9=param;
int l9_10=l9_8;
float2 l9_11=l9_9;
int l9_12=l9_10;
float l9_13=0.0;
float4 l9_14=float4(0.0);
float2 l9_15=l9_11;
int l9_16=sc_RayTracedAoTextureLayout_tmp;
int l9_17=l9_12;
float l9_18=l9_13;
float2 l9_19=l9_15;
int l9_20=l9_16;
int l9_21=l9_17;
float3 l9_22=float3(0.0);
if (l9_20==0)
{
l9_22=float3(l9_19,0.0);
}
else
{
if (l9_20==1)
{
l9_22=float3(l9_19.x,(l9_19.y*0.5)+(0.5-(float(l9_21)*0.5)),0.0);
}
else
{
l9_22=float3(l9_19,float(l9_21));
}
}
float3 l9_23=l9_22;
float3 l9_24=l9_23;
float2 l9_25=l9_24.xy;
float l9_26=l9_18;
float4 l9_27=sc_RayTracedAoTexture.sample(sc_RayTracedAoTextureSmpSC,l9_25,bias(l9_26));
float4 l9_28=l9_27;
l9_14=l9_28;
float4 l9_29=l9_14;
float4 l9_30=l9_29;
float4 l9_31=l9_30;
return l9_31.x;
}
return 0.0;
}
float srgbToLinear(thread const float& x)
{
if (SC_DEVICE_CLASS_tmp>=2)
{
return pow(x,2.2);
}
else
{
return x*x;
}
}
float linearToSrgb(thread const float& x)
{
if (SC_DEVICE_CLASS_tmp>=2)
{
return pow(x,0.45454547);
}
else
{
return sqrt(x);
}
}
float transformSingleColor(thread const float& original,thread const float& intMap,thread const float& target)
{
if (((int(BLEND_MODE_REALISTIC_tmp)!=0)||(int(BLEND_MODE_FORGRAY_tmp)!=0))||(int(BLEND_MODE_NOTBRIGHT_tmp)!=0))
{
return original/pow(1.0-target,intMap);
}
else
{
if ((int(BLEND_MODE_DIVISION_tmp)!=0))
{
return original/(1.0-target);
}
else
{
if ((int(BLEND_MODE_BRIGHT_tmp)!=0))
{
return original/pow(1.0-target,2.0-(2.0*original));
}
}
}
return 0.0;
}
float3 transformColor(thread const float& yValue,thread const float3& original,thread const float3& target,thread const float& weight,thread const float& intMap)
{
if ((int(BLEND_MODE_INTENSE_tmp)!=0))
{
float3 param=original;
float3 l9_0=param;
float4 l9_1;
if (l9_0.y<l9_0.z)
{
l9_1=float4(l9_0.zy,-1.0,0.66666669);
}
else
{
l9_1=float4(l9_0.yz,0.0,-0.33333334);
}
float4 l9_2=l9_1;
float4 l9_3;
if (l9_0.x<l9_2.x)
{
l9_3=float4(l9_2.xyw,l9_0.x);
}
else
{
l9_3=float4(l9_0.x,l9_2.yzx);
}
float4 l9_4=l9_3;
float l9_5=l9_4.x-fast::min(l9_4.w,l9_4.y);
float l9_6=abs(((l9_4.w-l9_4.y)/((6.0*l9_5)+1e-07))+l9_4.z);
float l9_7=l9_4.x;
float3 l9_8=float3(l9_6,l9_5,l9_7);
float3 l9_9=l9_8;
float l9_10=l9_9.z-(l9_9.y*0.5);
float l9_11=l9_9.y/((1.0-abs((2.0*l9_10)-1.0))+1e-07);
float3 l9_12=float3(l9_9.x,l9_11,l9_10);
float3 hslOrig=l9_12;
float3 res=float3(0.0);
res.x=target.x;
res.y=target.y;
res.z=hslOrig.z;
float3 param_1=res;
float l9_13=param_1.x;
float l9_14=abs((6.0*l9_13)-3.0)-1.0;
float l9_15=2.0-abs((6.0*l9_13)-2.0);
float l9_16=2.0-abs((6.0*l9_13)-4.0);
float3 l9_17=fast::clamp(float3(l9_14,l9_15,l9_16),float3(0.0),float3(1.0));
float3 l9_18=l9_17;
float l9_19=(1.0-abs((2.0*param_1.z)-1.0))*param_1.y;
l9_18=((l9_18-float3(0.5))*l9_19)+float3(param_1.z);
float3 l9_20=l9_18;
res=l9_20;
float3 resColor=mix(original,res,float3(weight));
return resColor;
}
else
{
float3 tmpColor=float3(0.0);
float param_2=yValue;
float param_3=intMap;
float param_4=target.x;
tmpColor.x=transformSingleColor(param_2,param_3,param_4);
float param_5=yValue;
float param_6=intMap;
float param_7=target.y;
tmpColor.y=transformSingleColor(param_5,param_6,param_7);
float param_8=yValue;
float param_9=intMap;
float param_10=target.z;
tmpColor.z=transformSingleColor(param_8,param_9,param_10);
tmpColor=fast::clamp(tmpColor,float3(0.0),float3(1.0));
float3 resColor_1=mix(original,tmpColor,float3(weight));
return resColor_1;
}
}
float3 definedBlend(thread const float3& a,thread const float3& b,thread int& varStereoViewID,constant userUniformsObj& UserUniforms,thread texture2d<float> intensityTexture,thread sampler intensityTextureSmpSC)
{
if ((int(BLEND_MODE_LIGHTEN_tmp)!=0))
{
return fast::max(a,b);
}
else
{
if ((int(BLEND_MODE_DARKEN_tmp)!=0))
{
return fast::min(a,b);
}
else
{
if ((int(BLEND_MODE_DIVIDE_tmp)!=0))
{
return b/a;
}
else
{
if ((int(BLEND_MODE_AVERAGE_tmp)!=0))
{
return (a+b)*0.5;
}
else
{
if ((int(BLEND_MODE_SUBTRACT_tmp)!=0))
{
return fast::max((a+b)-float3(1.0),float3(0.0));
}
else
{
if ((int(BLEND_MODE_DIFFERENCE_tmp)!=0))
{
return abs(a-b);
}
else
{
if ((int(BLEND_MODE_NEGATION_tmp)!=0))
{
return float3(1.0)-abs((float3(1.0)-a)-b);
}
else
{
if ((int(BLEND_MODE_EXCLUSION_tmp)!=0))
{
return (a+b)-((a*2.0)*b);
}
else
{
if ((int(BLEND_MODE_OVERLAY_tmp)!=0))
{
float l9_0;
if (a.x<0.5)
{
l9_0=(2.0*a.x)*b.x;
}
else
{
l9_0=1.0-((2.0*(1.0-a.x))*(1.0-b.x));
}
float l9_1=l9_0;
float l9_2;
if (a.y<0.5)
{
l9_2=(2.0*a.y)*b.y;
}
else
{
l9_2=1.0-((2.0*(1.0-a.y))*(1.0-b.y));
}
float l9_3=l9_2;
float l9_4;
if (a.z<0.5)
{
l9_4=(2.0*a.z)*b.z;
}
else
{
l9_4=1.0-((2.0*(1.0-a.z))*(1.0-b.z));
}
return float3(l9_1,l9_3,l9_4);
}
else
{
if ((int(BLEND_MODE_SOFT_LIGHT_tmp)!=0))
{
return (((float3(1.0)-(b*2.0))*a)*a)+((a*2.0)*b);
}
else
{
if ((int(BLEND_MODE_HARD_LIGHT_tmp)!=0))
{
float l9_5;
if (b.x<0.5)
{
l9_5=(2.0*b.x)*a.x;
}
else
{
l9_5=1.0-((2.0*(1.0-b.x))*(1.0-a.x));
}
float l9_6=l9_5;
float l9_7;
if (b.y<0.5)
{
l9_7=(2.0*b.y)*a.y;
}
else
{
l9_7=1.0-((2.0*(1.0-b.y))*(1.0-a.y));
}
float l9_8=l9_7;
float l9_9;
if (b.z<0.5)
{
l9_9=(2.0*b.z)*a.z;
}
else
{
l9_9=1.0-((2.0*(1.0-b.z))*(1.0-a.z));
}
return float3(l9_6,l9_8,l9_9);
}
else
{
if ((int(BLEND_MODE_COLOR_DODGE_tmp)!=0))
{
float l9_10;
if (b.x==1.0)
{
l9_10=b.x;
}
else
{
l9_10=fast::min(a.x/(1.0-b.x),1.0);
}
float l9_11=l9_10;
float l9_12;
if (b.y==1.0)
{
l9_12=b.y;
}
else
{
l9_12=fast::min(a.y/(1.0-b.y),1.0);
}
float l9_13=l9_12;
float l9_14;
if (b.z==1.0)
{
l9_14=b.z;
}
else
{
l9_14=fast::min(a.z/(1.0-b.z),1.0);
}
return float3(l9_11,l9_13,l9_14);
}
else
{
if ((int(BLEND_MODE_COLOR_BURN_tmp)!=0))
{
float l9_15;
if (b.x==0.0)
{
l9_15=b.x;
}
else
{
l9_15=fast::max(1.0-((1.0-a.x)/b.x),0.0);
}
float l9_16=l9_15;
float l9_17;
if (b.y==0.0)
{
l9_17=b.y;
}
else
{
l9_17=fast::max(1.0-((1.0-a.y)/b.y),0.0);
}
float l9_18=l9_17;
float l9_19;
if (b.z==0.0)
{
l9_19=b.z;
}
else
{
l9_19=fast::max(1.0-((1.0-a.z)/b.z),0.0);
}
return float3(l9_16,l9_18,l9_19);
}
else
{
if ((int(BLEND_MODE_LINEAR_LIGHT_tmp)!=0))
{
float l9_20;
if (b.x<0.5)
{
l9_20=fast::max((a.x+(2.0*b.x))-1.0,0.0);
}
else
{
l9_20=fast::min(a.x+(2.0*(b.x-0.5)),1.0);
}
float l9_21=l9_20;
float l9_22;
if (b.y<0.5)
{
l9_22=fast::max((a.y+(2.0*b.y))-1.0,0.0);
}
else
{
l9_22=fast::min(a.y+(2.0*(b.y-0.5)),1.0);
}
float l9_23=l9_22;
float l9_24;
if (b.z<0.5)
{
l9_24=fast::max((a.z+(2.0*b.z))-1.0,0.0);
}
else
{
l9_24=fast::min(a.z+(2.0*(b.z-0.5)),1.0);
}
return float3(l9_21,l9_23,l9_24);
}
else
{
if ((int(BLEND_MODE_VIVID_LIGHT_tmp)!=0))
{
float l9_25;
if (b.x<0.5)
{
float l9_26;
if ((2.0*b.x)==0.0)
{
l9_26=2.0*b.x;
}
else
{
l9_26=fast::max(1.0-((1.0-a.x)/(2.0*b.x)),0.0);
}
l9_25=l9_26;
}
else
{
float l9_27;
if ((2.0*(b.x-0.5))==1.0)
{
l9_27=2.0*(b.x-0.5);
}
else
{
l9_27=fast::min(a.x/(1.0-(2.0*(b.x-0.5))),1.0);
}
l9_25=l9_27;
}
float l9_28=l9_25;
float l9_29;
if (b.y<0.5)
{
float l9_30;
if ((2.0*b.y)==0.0)
{
l9_30=2.0*b.y;
}
else
{
l9_30=fast::max(1.0-((1.0-a.y)/(2.0*b.y)),0.0);
}
l9_29=l9_30;
}
else
{
float l9_31;
if ((2.0*(b.y-0.5))==1.0)
{
l9_31=2.0*(b.y-0.5);
}
else
{
l9_31=fast::min(a.y/(1.0-(2.0*(b.y-0.5))),1.0);
}
l9_29=l9_31;
}
float l9_32=l9_29;
float l9_33;
if (b.z<0.5)
{
float l9_34;
if ((2.0*b.z)==0.0)
{
l9_34=2.0*b.z;
}
else
{
l9_34=fast::max(1.0-((1.0-a.z)/(2.0*b.z)),0.0);
}
l9_33=l9_34;
}
else
{
float l9_35;
if ((2.0*(b.z-0.5))==1.0)
{
l9_35=2.0*(b.z-0.5);
}
else
{
l9_35=fast::min(a.z/(1.0-(2.0*(b.z-0.5))),1.0);
}
l9_33=l9_35;
}
return float3(l9_28,l9_32,l9_33);
}
else
{
if ((int(BLEND_MODE_PIN_LIGHT_tmp)!=0))
{
float l9_36;
if (b.x<0.5)
{
l9_36=fast::min(a.x,2.0*b.x);
}
else
{
l9_36=fast::max(a.x,2.0*(b.x-0.5));
}
float l9_37=l9_36;
float l9_38;
if (b.y<0.5)
{
l9_38=fast::min(a.y,2.0*b.y);
}
else
{
l9_38=fast::max(a.y,2.0*(b.y-0.5));
}
float l9_39=l9_38;
float l9_40;
if (b.z<0.5)
{
l9_40=fast::min(a.z,2.0*b.z);
}
else
{
l9_40=fast::max(a.z,2.0*(b.z-0.5));
}
return float3(l9_37,l9_39,l9_40);
}
else
{
if ((int(BLEND_MODE_HARD_MIX_tmp)!=0))
{
float l9_41;
if (b.x<0.5)
{
float l9_42;
if ((2.0*b.x)==0.0)
{
l9_42=2.0*b.x;
}
else
{
l9_42=fast::max(1.0-((1.0-a.x)/(2.0*b.x)),0.0);
}
l9_41=l9_42;
}
else
{
float l9_43;
if ((2.0*(b.x-0.5))==1.0)
{
l9_43=2.0*(b.x-0.5);
}
else
{
l9_43=fast::min(a.x/(1.0-(2.0*(b.x-0.5))),1.0);
}
l9_41=l9_43;
}
float l9_44=l9_41;
float l9_45;
if (b.y<0.5)
{
float l9_46;
if ((2.0*b.y)==0.0)
{
l9_46=2.0*b.y;
}
else
{
l9_46=fast::max(1.0-((1.0-a.y)/(2.0*b.y)),0.0);
}
l9_45=l9_46;
}
else
{
float l9_47;
if ((2.0*(b.y-0.5))==1.0)
{
l9_47=2.0*(b.y-0.5);
}
else
{
l9_47=fast::min(a.y/(1.0-(2.0*(b.y-0.5))),1.0);
}
l9_45=l9_47;
}
float l9_48=l9_45;
float l9_49;
if (b.z<0.5)
{
float l9_50;
if ((2.0*b.z)==0.0)
{
l9_50=2.0*b.z;
}
else
{
l9_50=fast::max(1.0-((1.0-a.z)/(2.0*b.z)),0.0);
}
l9_49=l9_50;
}
else
{
float l9_51;
if ((2.0*(b.z-0.5))==1.0)
{
l9_51=2.0*(b.z-0.5);
}
else
{
l9_51=fast::min(a.z/(1.0-(2.0*(b.z-0.5))),1.0);
}
l9_49=l9_51;
}
return float3((l9_44<0.5) ? 0.0 : 1.0,(l9_48<0.5) ? 0.0 : 1.0,(l9_49<0.5) ? 0.0 : 1.0);
}
else
{
if ((int(BLEND_MODE_HARD_REFLECT_tmp)!=0))
{
float l9_52;
if (b.x==1.0)
{
l9_52=b.x;
}
else
{
l9_52=fast::min((a.x*a.x)/(1.0-b.x),1.0);
}
float l9_53=l9_52;
float l9_54;
if (b.y==1.0)
{
l9_54=b.y;
}
else
{
l9_54=fast::min((a.y*a.y)/(1.0-b.y),1.0);
}
float l9_55=l9_54;
float l9_56;
if (b.z==1.0)
{
l9_56=b.z;
}
else
{
l9_56=fast::min((a.z*a.z)/(1.0-b.z),1.0);
}
return float3(l9_53,l9_55,l9_56);
}
else
{
if ((int(BLEND_MODE_HARD_GLOW_tmp)!=0))
{
float l9_57;
if (a.x==1.0)
{
l9_57=a.x;
}
else
{
l9_57=fast::min((b.x*b.x)/(1.0-a.x),1.0);
}
float l9_58=l9_57;
float l9_59;
if (a.y==1.0)
{
l9_59=a.y;
}
else
{
l9_59=fast::min((b.y*b.y)/(1.0-a.y),1.0);
}
float l9_60=l9_59;
float l9_61;
if (a.z==1.0)
{
l9_61=a.z;
}
else
{
l9_61=fast::min((b.z*b.z)/(1.0-a.z),1.0);
}
return float3(l9_58,l9_60,l9_61);
}
else
{
if ((int(BLEND_MODE_HARD_PHOENIX_tmp)!=0))
{
return (fast::min(a,b)-fast::max(a,b))+float3(1.0);
}
else
{
if ((int(BLEND_MODE_HUE_tmp)!=0))
{
float3 param=a;
float3 param_1=b;
float3 l9_62=param;
float3 l9_63=l9_62;
float4 l9_64;
if (l9_63.y<l9_63.z)
{
l9_64=float4(l9_63.zy,-1.0,0.66666669);
}
else
{
l9_64=float4(l9_63.yz,0.0,-0.33333334);
}
float4 l9_65=l9_64;
float4 l9_66;
if (l9_63.x<l9_65.x)
{
l9_66=float4(l9_65.xyw,l9_63.x);
}
else
{
l9_66=float4(l9_63.x,l9_65.yzx);
}
float4 l9_67=l9_66;
float l9_68=l9_67.x-fast::min(l9_67.w,l9_67.y);
float l9_69=abs(((l9_67.w-l9_67.y)/((6.0*l9_68)+1e-07))+l9_67.z);
float l9_70=l9_67.x;
float3 l9_71=float3(l9_69,l9_68,l9_70);
float3 l9_72=l9_71;
float l9_73=l9_72.z-(l9_72.y*0.5);
float l9_74=l9_72.y/((1.0-abs((2.0*l9_73)-1.0))+1e-07);
float3 l9_75=float3(l9_72.x,l9_74,l9_73);
float3 l9_76=l9_75;
float3 l9_77=param_1;
float3 l9_78=l9_77;
float4 l9_79;
if (l9_78.y<l9_78.z)
{
l9_79=float4(l9_78.zy,-1.0,0.66666669);
}
else
{
l9_79=float4(l9_78.yz,0.0,-0.33333334);
}
float4 l9_80=l9_79;
float4 l9_81;
if (l9_78.x<l9_80.x)
{
l9_81=float4(l9_80.xyw,l9_78.x);
}
else
{
l9_81=float4(l9_78.x,l9_80.yzx);
}
float4 l9_82=l9_81;
float l9_83=l9_82.x-fast::min(l9_82.w,l9_82.y);
float l9_84=abs(((l9_82.w-l9_82.y)/((6.0*l9_83)+1e-07))+l9_82.z);
float l9_85=l9_82.x;
float3 l9_86=float3(l9_84,l9_83,l9_85);
float3 l9_87=l9_86;
float l9_88=l9_87.z-(l9_87.y*0.5);
float l9_89=l9_87.y/((1.0-abs((2.0*l9_88)-1.0))+1e-07);
float3 l9_90=float3(l9_87.x,l9_89,l9_88);
float3 l9_91=float3(l9_90.x,l9_76.y,l9_76.z);
float l9_92=l9_91.x;
float l9_93=abs((6.0*l9_92)-3.0)-1.0;
float l9_94=2.0-abs((6.0*l9_92)-2.0);
float l9_95=2.0-abs((6.0*l9_92)-4.0);
float3 l9_96=fast::clamp(float3(l9_93,l9_94,l9_95),float3(0.0),float3(1.0));
float3 l9_97=l9_96;
float l9_98=(1.0-abs((2.0*l9_91.z)-1.0))*l9_91.y;
l9_97=((l9_97-float3(0.5))*l9_98)+float3(l9_91.z);
float3 l9_99=l9_97;
float3 l9_100=l9_99;
return l9_100;
}
else
{
if ((int(BLEND_MODE_SATURATION_tmp)!=0))
{
float3 param_2=a;
float3 param_3=b;
float3 l9_101=param_2;
float3 l9_102=l9_101;
float4 l9_103;
if (l9_102.y<l9_102.z)
{
l9_103=float4(l9_102.zy,-1.0,0.66666669);
}
else
{
l9_103=float4(l9_102.yz,0.0,-0.33333334);
}
float4 l9_104=l9_103;
float4 l9_105;
if (l9_102.x<l9_104.x)
{
l9_105=float4(l9_104.xyw,l9_102.x);
}
else
{
l9_105=float4(l9_102.x,l9_104.yzx);
}
float4 l9_106=l9_105;
float l9_107=l9_106.x-fast::min(l9_106.w,l9_106.y);
float l9_108=abs(((l9_106.w-l9_106.y)/((6.0*l9_107)+1e-07))+l9_106.z);
float l9_109=l9_106.x;
float3 l9_110=float3(l9_108,l9_107,l9_109);
float3 l9_111=l9_110;
float l9_112=l9_111.z-(l9_111.y*0.5);
float l9_113=l9_111.y/((1.0-abs((2.0*l9_112)-1.0))+1e-07);
float3 l9_114=float3(l9_111.x,l9_113,l9_112);
float3 l9_115=l9_114;
float l9_116=l9_115.x;
float3 l9_117=param_3;
float3 l9_118=l9_117;
float4 l9_119;
if (l9_118.y<l9_118.z)
{
l9_119=float4(l9_118.zy,-1.0,0.66666669);
}
else
{
l9_119=float4(l9_118.yz,0.0,-0.33333334);
}
float4 l9_120=l9_119;
float4 l9_121;
if (l9_118.x<l9_120.x)
{
l9_121=float4(l9_120.xyw,l9_118.x);
}
else
{
l9_121=float4(l9_118.x,l9_120.yzx);
}
float4 l9_122=l9_121;
float l9_123=l9_122.x-fast::min(l9_122.w,l9_122.y);
float l9_124=abs(((l9_122.w-l9_122.y)/((6.0*l9_123)+1e-07))+l9_122.z);
float l9_125=l9_122.x;
float3 l9_126=float3(l9_124,l9_123,l9_125);
float3 l9_127=l9_126;
float l9_128=l9_127.z-(l9_127.y*0.5);
float l9_129=l9_127.y/((1.0-abs((2.0*l9_128)-1.0))+1e-07);
float3 l9_130=float3(l9_127.x,l9_129,l9_128);
float3 l9_131=float3(l9_116,l9_130.y,l9_115.z);
float l9_132=l9_131.x;
float l9_133=abs((6.0*l9_132)-3.0)-1.0;
float l9_134=2.0-abs((6.0*l9_132)-2.0);
float l9_135=2.0-abs((6.0*l9_132)-4.0);
float3 l9_136=fast::clamp(float3(l9_133,l9_134,l9_135),float3(0.0),float3(1.0));
float3 l9_137=l9_136;
float l9_138=(1.0-abs((2.0*l9_131.z)-1.0))*l9_131.y;
l9_137=((l9_137-float3(0.5))*l9_138)+float3(l9_131.z);
float3 l9_139=l9_137;
float3 l9_140=l9_139;
return l9_140;
}
else
{
if ((int(BLEND_MODE_COLOR_tmp)!=0))
{
float3 param_4=a;
float3 param_5=b;
float3 l9_141=param_5;
float3 l9_142=l9_141;
float4 l9_143;
if (l9_142.y<l9_142.z)
{
l9_143=float4(l9_142.zy,-1.0,0.66666669);
}
else
{
l9_143=float4(l9_142.yz,0.0,-0.33333334);
}
float4 l9_144=l9_143;
float4 l9_145;
if (l9_142.x<l9_144.x)
{
l9_145=float4(l9_144.xyw,l9_142.x);
}
else
{
l9_145=float4(l9_142.x,l9_144.yzx);
}
float4 l9_146=l9_145;
float l9_147=l9_146.x-fast::min(l9_146.w,l9_146.y);
float l9_148=abs(((l9_146.w-l9_146.y)/((6.0*l9_147)+1e-07))+l9_146.z);
float l9_149=l9_146.x;
float3 l9_150=float3(l9_148,l9_147,l9_149);
float3 l9_151=l9_150;
float l9_152=l9_151.z-(l9_151.y*0.5);
float l9_153=l9_151.y/((1.0-abs((2.0*l9_152)-1.0))+1e-07);
float3 l9_154=float3(l9_151.x,l9_153,l9_152);
float3 l9_155=l9_154;
float l9_156=l9_155.x;
float l9_157=l9_155.y;
float3 l9_158=param_4;
float3 l9_159=l9_158;
float4 l9_160;
if (l9_159.y<l9_159.z)
{
l9_160=float4(l9_159.zy,-1.0,0.66666669);
}
else
{
l9_160=float4(l9_159.yz,0.0,-0.33333334);
}
float4 l9_161=l9_160;
float4 l9_162;
if (l9_159.x<l9_161.x)
{
l9_162=float4(l9_161.xyw,l9_159.x);
}
else
{
l9_162=float4(l9_159.x,l9_161.yzx);
}
float4 l9_163=l9_162;
float l9_164=l9_163.x-fast::min(l9_163.w,l9_163.y);
float l9_165=abs(((l9_163.w-l9_163.y)/((6.0*l9_164)+1e-07))+l9_163.z);
float l9_166=l9_163.x;
float3 l9_167=float3(l9_165,l9_164,l9_166);
float3 l9_168=l9_167;
float l9_169=l9_168.z-(l9_168.y*0.5);
float l9_170=l9_168.y/((1.0-abs((2.0*l9_169)-1.0))+1e-07);
float3 l9_171=float3(l9_168.x,l9_170,l9_169);
float3 l9_172=float3(l9_156,l9_157,l9_171.z);
float l9_173=l9_172.x;
float l9_174=abs((6.0*l9_173)-3.0)-1.0;
float l9_175=2.0-abs((6.0*l9_173)-2.0);
float l9_176=2.0-abs((6.0*l9_173)-4.0);
float3 l9_177=fast::clamp(float3(l9_174,l9_175,l9_176),float3(0.0),float3(1.0));
float3 l9_178=l9_177;
float l9_179=(1.0-abs((2.0*l9_172.z)-1.0))*l9_172.y;
l9_178=((l9_178-float3(0.5))*l9_179)+float3(l9_172.z);
float3 l9_180=l9_178;
float3 l9_181=l9_180;
return l9_181;
}
else
{
if ((int(BLEND_MODE_LUMINOSITY_tmp)!=0))
{
float3 param_6=a;
float3 param_7=b;
float3 l9_182=param_6;
float3 l9_183=l9_182;
float4 l9_184;
if (l9_183.y<l9_183.z)
{
l9_184=float4(l9_183.zy,-1.0,0.66666669);
}
else
{
l9_184=float4(l9_183.yz,0.0,-0.33333334);
}
float4 l9_185=l9_184;
float4 l9_186;
if (l9_183.x<l9_185.x)
{
l9_186=float4(l9_185.xyw,l9_183.x);
}
else
{
l9_186=float4(l9_183.x,l9_185.yzx);
}
float4 l9_187=l9_186;
float l9_188=l9_187.x-fast::min(l9_187.w,l9_187.y);
float l9_189=abs(((l9_187.w-l9_187.y)/((6.0*l9_188)+1e-07))+l9_187.z);
float l9_190=l9_187.x;
float3 l9_191=float3(l9_189,l9_188,l9_190);
float3 l9_192=l9_191;
float l9_193=l9_192.z-(l9_192.y*0.5);
float l9_194=l9_192.y/((1.0-abs((2.0*l9_193)-1.0))+1e-07);
float3 l9_195=float3(l9_192.x,l9_194,l9_193);
float3 l9_196=l9_195;
float l9_197=l9_196.x;
float l9_198=l9_196.y;
float3 l9_199=param_7;
float3 l9_200=l9_199;
float4 l9_201;
if (l9_200.y<l9_200.z)
{
l9_201=float4(l9_200.zy,-1.0,0.66666669);
}
else
{
l9_201=float4(l9_200.yz,0.0,-0.33333334);
}
float4 l9_202=l9_201;
float4 l9_203;
if (l9_200.x<l9_202.x)
{
l9_203=float4(l9_202.xyw,l9_200.x);
}
else
{
l9_203=float4(l9_200.x,l9_202.yzx);
}
float4 l9_204=l9_203;
float l9_205=l9_204.x-fast::min(l9_204.w,l9_204.y);
float l9_206=abs(((l9_204.w-l9_204.y)/((6.0*l9_205)+1e-07))+l9_204.z);
float l9_207=l9_204.x;
float3 l9_208=float3(l9_206,l9_205,l9_207);
float3 l9_209=l9_208;
float l9_210=l9_209.z-(l9_209.y*0.5);
float l9_211=l9_209.y/((1.0-abs((2.0*l9_210)-1.0))+1e-07);
float3 l9_212=float3(l9_209.x,l9_211,l9_210);
float3 l9_213=float3(l9_197,l9_198,l9_212.z);
float l9_214=l9_213.x;
float l9_215=abs((6.0*l9_214)-3.0)-1.0;
float l9_216=2.0-abs((6.0*l9_214)-2.0);
float l9_217=2.0-abs((6.0*l9_214)-4.0);
float3 l9_218=fast::clamp(float3(l9_215,l9_216,l9_217),float3(0.0),float3(1.0));
float3 l9_219=l9_218;
float l9_220=(1.0-abs((2.0*l9_213.z)-1.0))*l9_213.y;
l9_219=((l9_219-float3(0.5))*l9_220)+float3(l9_213.z);
float3 l9_221=l9_219;
float3 l9_222=l9_221;
return l9_222;
}
else
{
float3 param_8=a;
float3 param_9=b;
float3 l9_223=param_8;
float l9_224=((0.29899999*l9_223.x)+(0.58700001*l9_223.y))+(0.114*l9_223.z);
float l9_225=l9_224;
float l9_226=1.0;
float l9_227=pow(l9_225,1.0/UserUniforms.correctedIntensity);
int l9_228=0;
if ((int(intensityTextureHasSwappedViews_tmp)!=0))
{
int l9_229=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_229=0;
}
else
{
l9_229=varStereoViewID;
}
int l9_230=l9_229;
l9_228=1-l9_230;
}
else
{
int l9_231=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_231=0;
}
else
{
l9_231=varStereoViewID;
}
int l9_232=l9_231;
l9_228=l9_232;
}
int l9_233=l9_228;
int l9_234=intensityTextureLayout_tmp;
int l9_235=l9_233;
float2 l9_236=float2(l9_227,0.5);
bool l9_237=(int(SC_USE_UV_TRANSFORM_intensityTexture_tmp)!=0);
float3x3 l9_238=UserUniforms.intensityTextureTransform;
int2 l9_239=int2(SC_SOFTWARE_WRAP_MODE_U_intensityTexture_tmp,SC_SOFTWARE_WRAP_MODE_V_intensityTexture_tmp);
bool l9_240=(int(SC_USE_UV_MIN_MAX_intensityTexture_tmp)!=0);
float4 l9_241=UserUniforms.intensityTextureUvMinMax;
bool l9_242=(int(SC_USE_CLAMP_TO_BORDER_intensityTexture_tmp)!=0);
float4 l9_243=UserUniforms.intensityTextureBorderColor;
float l9_244=0.0;
bool l9_245=l9_242&&(!l9_240);
float l9_246=1.0;
float l9_247=l9_236.x;
int l9_248=l9_239.x;
if (l9_248==1)
{
l9_247=fract(l9_247);
}
else
{
if (l9_248==2)
{
float l9_249=fract(l9_247);
float l9_250=l9_247-l9_249;
float l9_251=step(0.25,fract(l9_250*0.5));
l9_247=mix(l9_249,1.0-l9_249,fast::clamp(l9_251,0.0,1.0));
}
}
l9_236.x=l9_247;
float l9_252=l9_236.y;
int l9_253=l9_239.y;
if (l9_253==1)
{
l9_252=fract(l9_252);
}
else
{
if (l9_253==2)
{
float l9_254=fract(l9_252);
float l9_255=l9_252-l9_254;
float l9_256=step(0.25,fract(l9_255*0.5));
l9_252=mix(l9_254,1.0-l9_254,fast::clamp(l9_256,0.0,1.0));
}
}
l9_236.y=l9_252;
if (l9_240)
{
bool l9_257=l9_242;
bool l9_258;
if (l9_257)
{
l9_258=l9_239.x==3;
}
else
{
l9_258=l9_257;
}
float l9_259=l9_236.x;
float l9_260=l9_241.x;
float l9_261=l9_241.z;
bool l9_262=l9_258;
float l9_263=l9_246;
float l9_264=fast::clamp(l9_259,l9_260,l9_261);
float l9_265=step(abs(l9_259-l9_264),9.9999997e-06);
l9_263*=(l9_265+((1.0-float(l9_262))*(1.0-l9_265)));
l9_259=l9_264;
l9_236.x=l9_259;
l9_246=l9_263;
bool l9_266=l9_242;
bool l9_267;
if (l9_266)
{
l9_267=l9_239.y==3;
}
else
{
l9_267=l9_266;
}
float l9_268=l9_236.y;
float l9_269=l9_241.y;
float l9_270=l9_241.w;
bool l9_271=l9_267;
float l9_272=l9_246;
float l9_273=fast::clamp(l9_268,l9_269,l9_270);
float l9_274=step(abs(l9_268-l9_273),9.9999997e-06);
l9_272*=(l9_274+((1.0-float(l9_271))*(1.0-l9_274)));
l9_268=l9_273;
l9_236.y=l9_268;
l9_246=l9_272;
}
float2 l9_275=l9_236;
bool l9_276=l9_237;
float3x3 l9_277=l9_238;
if (l9_276)
{
l9_275=float2((l9_277*float3(l9_275,1.0)).xy);
}
float2 l9_278=l9_275;
float2 l9_279=l9_278;
float2 l9_280=l9_279;
l9_236=l9_280;
float l9_281=l9_236.x;
int l9_282=l9_239.x;
bool l9_283=l9_245;
float l9_284=l9_246;
if ((l9_282==0)||(l9_282==3))
{
float l9_285=l9_281;
float l9_286=0.0;
float l9_287=1.0;
bool l9_288=l9_283;
float l9_289=l9_284;
float l9_290=fast::clamp(l9_285,l9_286,l9_287);
float l9_291=step(abs(l9_285-l9_290),9.9999997e-06);
l9_289*=(l9_291+((1.0-float(l9_288))*(1.0-l9_291)));
l9_285=l9_290;
l9_281=l9_285;
l9_284=l9_289;
}
l9_236.x=l9_281;
l9_246=l9_284;
float l9_292=l9_236.y;
int l9_293=l9_239.y;
bool l9_294=l9_245;
float l9_295=l9_246;
if ((l9_293==0)||(l9_293==3))
{
float l9_296=l9_292;
float l9_297=0.0;
float l9_298=1.0;
bool l9_299=l9_294;
float l9_300=l9_295;
float l9_301=fast::clamp(l9_296,l9_297,l9_298);
float l9_302=step(abs(l9_296-l9_301),9.9999997e-06);
l9_300*=(l9_302+((1.0-float(l9_299))*(1.0-l9_302)));
l9_296=l9_301;
l9_292=l9_296;
l9_295=l9_300;
}
l9_236.y=l9_292;
l9_246=l9_295;
float2 l9_303=l9_236;
int l9_304=l9_234;
int l9_305=l9_235;
float l9_306=l9_244;
float2 l9_307=l9_303;
int l9_308=l9_304;
int l9_309=l9_305;
float3 l9_310=float3(0.0);
if (l9_308==0)
{
l9_310=float3(l9_307,0.0);
}
else
{
if (l9_308==1)
{
l9_310=float3(l9_307.x,(l9_307.y*0.5)+(0.5-(float(l9_309)*0.5)),0.0);
}
else
{
l9_310=float3(l9_307,float(l9_309));
}
}
float3 l9_311=l9_310;
float3 l9_312=l9_311;
float2 l9_313=l9_312.xy;
float l9_314=l9_306;
float4 l9_315=intensityTexture.sample(intensityTextureSmpSC,l9_313,bias(l9_314));
float4 l9_316=l9_315;
float4 l9_317=l9_316;
if (l9_242)
{
l9_317=mix(l9_243,l9_317,float4(l9_246));
}
float4 l9_318=l9_317;
float3 l9_319=l9_318.xyz;
float3 l9_320=l9_319;
float l9_321=16.0;
float l9_322=((((l9_320.x*256.0)+l9_320.y)+(l9_320.z/256.0))/257.00391)*l9_321;
float l9_323=l9_322;
if ((int(BLEND_MODE_FORGRAY_tmp)!=0))
{
l9_323=fast::max(l9_323,1.0);
}
if ((int(BLEND_MODE_NOTBRIGHT_tmp)!=0))
{
l9_323=fast::min(l9_323,1.0);
}
float l9_324=l9_225;
float3 l9_325=param_8;
float3 l9_326=param_9;
float l9_327=l9_226;
float l9_328=l9_323;
float3 l9_329=transformColor(l9_324,l9_325,l9_326,l9_327,l9_328);
return l9_329;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
float4 outputMotionVectorsIfNeeded(thread const float3& surfacePosWorldSpace,thread const float4& finalColor,thread int& varStereoViewID,constant userUniformsObj& UserUniforms)
{
if ((int(sc_MotionVectorsPass_tmp)!=0))
{
float3 param=surfacePosWorldSpace;
int l9_0=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_0=0;
}
else
{
l9_0=varStereoViewID;
}
int l9_1=l9_0;
float4 l9_2=UserUniforms.sc_ViewProjectionMatrixArray[l9_1]*float4(param,1.0);
float2 l9_3=l9_2.xy/float2(l9_2.w);
l9_2=float4(l9_3.x,l9_3.y,l9_2.z,l9_2.w);
int l9_4=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_4=0;
}
else
{
l9_4=varStereoViewID;
}
int l9_5=l9_4;
float4 l9_6=((UserUniforms.sc_PrevFrameViewProjectionMatrixArray[l9_5]*UserUniforms.sc_PrevFrameModelMatrix)*UserUniforms.sc_ModelMatrixInverse)*float4(param,1.0);
float2 l9_7=l9_6.xy/float2(l9_6.w);
l9_6=float4(l9_7.x,l9_7.y,l9_6.z,l9_6.w);
float2 l9_8=(l9_2.xy-l9_6.xy)*0.5;
float2 l9_9=l9_8;
float l9_10=(l9_9.x*5.0)+0.5;
float l9_11=floor(l9_10*65535.0);
float l9_12=floor(l9_11*0.00390625);
float2 l9_13=float2(l9_12/255.0,(l9_11-(l9_12*256.0))/255.0);
float l9_14=(l9_9.y*5.0)+0.5;
float l9_15=floor(l9_14*65535.0);
float l9_16=floor(l9_15*0.00390625);
float2 l9_17=float2(l9_16/255.0,(l9_15-(l9_16*256.0))/255.0);
float4 l9_18=float4(l9_13,l9_17);
float4 l9_19=l9_18;
return l9_19;
}
else
{
return finalColor;
}
}
fragment main_frag_out main_frag(main_frag_in in [[stage_in]],constant sc_Set0& sc_set0 [[buffer(0)]],float4 gl_FragCoord [[position]])
{
main_frag_out out={};
if ((int(sc_DepthOnly_tmp)!=0))
{
return out;
}
if ((sc_StereoRenderingMode_tmp==1)&&(sc_StereoRendering_IsClipDistanceEnabled_tmp==0))
{
if (in.varClipDistance<0.0)
{
discard_fragment();
}
}
ssPreviewInfo PreviewInfo;
PreviewInfo.Color=in.PreviewVertexColor;
PreviewInfo.Saved=((in.PreviewVertexSaved*1.0)!=0.0) ? true : false;
float4 FinalColor=float4(1.0);
ssGlobals Globals;
Globals.gTimeElapsed=(*sc_set0.UserUniforms).sc_Time.x;
Globals.gTimeDelta=(*sc_set0.UserUniforms).sc_Time.y;
Globals.BumpedNormal=float3(0.0);
Globals.ViewDirWS=normalize((*sc_set0.UserUniforms).sc_Camera.position-in.varPos);
Globals.PositionWS=in.varPos;
Globals.Surface_UVCoord0=in.varPackedTex.xy;
float4 Output_N5=float4(0.0);
float4 param=(*sc_set0.UserUniforms).baseColor;
Output_N5=param;
float2 UVCoord_N42=float2(0.0);
UVCoord_N42=Globals.Surface_UVCoord0;
float2 Output_N41=float2(0.0);
Output_N41=UVCoord_N42-(*sc_set0.UserUniforms).Port_Input1_N041;
float2 Output_N99=float2(0.0);
Output_N99=Output_N41*(*sc_set0.UserUniforms).Port_Input1_N099;
float3 Value_N100=float3(0.0);
Value_N100=float3(Output_N99.x,Output_N99.y,Value_N100.z);
Value_N100.z=(*sc_set0.UserUniforms).Port_Value2_N100;
float3 Output_N101=float3(0.0);
float3 param_1=Value_N100;
float l9_0=dot(param_1,param_1);
float l9_1;
if (l9_0>0.0)
{
l9_1=1.0/sqrt(l9_0);
}
else
{
l9_1=0.0;
}
float l9_2=l9_1;
float3 param_2=param_1*l9_2;
Output_N101=param_2;
float3 VectorOut_N106=float3(0.0);
VectorOut_N106=((*sc_set0.UserUniforms).sc_ModelMatrix*float4(Output_N101,1.0)).xyz;
float Output_N1=0.0;
float param_3=(*sc_set0.UserUniforms).Port_Value_N001;
float param_4=param_3+0.001;
param_4-=0.001;
Output_N1=param_4;
float Output_N2=0.0;
float param_5=(*sc_set0.UserUniforms).Port_Value_N002;
float param_6=param_5+0.001;
param_6-=0.001;
Output_N2=param_6;
float4 Output_N0=float4(0.0);
float3 param_7=Output_N5.xyz;
float param_8=(*sc_set0.UserUniforms).Port_Opacity_N000;
float3 param_9=VectorOut_N106;
float3 param_10=(*sc_set0.UserUniforms).Port_Emissive_N000;
float param_11=Output_N1;
float param_12=Output_N2;
float3 param_13=(*sc_set0.UserUniforms).Port_AO_N000;
float3 param_14=(*sc_set0.UserUniforms).Port_SpecularAO_N000;
ssGlobals param_16=Globals;
if (!(int(sc_ProjectiveShadowsCaster_tmp)!=0))
{
param_16.BumpedNormal=param_9;
}
float l9_3=param_8;
if ((int(sc_BlendMode_AlphaTest_tmp)!=0))
{
if (l9_3<(*sc_set0.UserUniforms).alphaTestThreshold)
{
discard_fragment();
}
}
if ((int(ENABLE_STIPPLE_PATTERN_TEST_tmp)!=0))
{
float4 l9_4=gl_FragCoord;
float2 l9_5=floor(mod(l9_4.xy,float2(4.0)));
float l9_6=(mod(dot(l9_5,float2(4.0,1.0))*9.0,16.0)+1.0)/17.0;
if (l9_3<l9_6)
{
discard_fragment();
}
}
param_7=fast::max(param_7,float3(0.0));
float4 param_15;
if ((int(sc_ProjectiveShadowsCaster_tmp)!=0))
{
param_15=float4(param_7,param_8);
}
else
{
param_11=fast::clamp(param_11,0.0,1.0);
param_12=fast::clamp(param_12,0.0,1.0);
float3 l9_7=param_7;
float l9_8=param_8;
float3 l9_9=param_16.BumpedNormal;
float3 l9_10=param_16.PositionWS;
float3 l9_11=param_16.ViewDirWS;
float3 l9_12=param_10;
float l9_13=param_11;
float l9_14=param_12;
float3 l9_15=param_13;
float3 l9_16=param_14;
SurfaceProperties l9_17;
l9_17.albedo=float3(0.0);
l9_17.opacity=1.0;
l9_17.normal=float3(0.0);
l9_17.positionWS=float3(0.0);
l9_17.viewDirWS=float3(0.0);
l9_17.metallic=0.0;
l9_17.roughness=0.0;
l9_17.emissive=float3(0.0);
l9_17.ao=float3(1.0);
l9_17.specularAo=float3(1.0);
l9_17.bakedShadows=float3(1.0);
SurfaceProperties l9_18=l9_17;
SurfaceProperties l9_19=l9_18;
l9_19.opacity=l9_8;
float3 l9_20=l9_7;
float3 l9_21;
if (SC_DEVICE_CLASS_tmp>=2)
{
l9_21=float3(pow(l9_20.x,2.2),pow(l9_20.y,2.2),pow(l9_20.z,2.2));
}
else
{
l9_21=l9_20*l9_20;
}
float3 l9_22=l9_21;
l9_19.albedo=l9_22;
l9_19.normal=normalize(l9_9);
l9_19.positionWS=l9_10;
l9_19.viewDirWS=l9_11;
float3 l9_23=l9_12;
float3 l9_24;
if (SC_DEVICE_CLASS_tmp>=2)
{
l9_24=float3(pow(l9_23.x,2.2),pow(l9_23.y,2.2),pow(l9_23.z,2.2));
}
else
{
l9_24=l9_23*l9_23;
}
float3 l9_25=l9_24;
l9_19.emissive=l9_25;
l9_19.metallic=l9_13;
l9_19.roughness=l9_14;
l9_19.ao=l9_15;
l9_19.specularAo=l9_16;
if ((int(sc_SSAOEnabled_tmp)!=0))
{
float3 l9_26=l9_19.positionWS;
l9_19.ao=evaluateSSAO(l9_26,in.varStereoViewID,(*sc_set0.UserUniforms),sc_set0.sc_SSAOTexture,sc_set0.sc_SSAOTextureSmpSC);
}
SurfaceProperties l9_27=l9_19;
SurfaceProperties l9_28=l9_27;
float3 l9_29=mix(float3(0.039999999),l9_28.albedo*l9_28.metallic,float3(l9_28.metallic));
float3 l9_30=mix(l9_28.albedo*(1.0-l9_28.metallic),float3(0.0),float3(l9_28.metallic));
l9_27.albedo=l9_30;
l9_27.specColor=l9_29;
SurfaceProperties l9_31=l9_27;
l9_19=l9_31;
SurfaceProperties l9_32=l9_19;
LightingComponents l9_33;
l9_33.directDiffuse=float3(0.0);
l9_33.directSpecular=float3(0.0);
l9_33.indirectDiffuse=float3(1.0);
l9_33.indirectSpecular=float3(0.0);
l9_33.emitted=float3(0.0);
l9_33.transmitted=float3(0.0);
LightingComponents l9_34=l9_33;
LightingComponents l9_35=l9_34;
float3 l9_36=l9_32.viewDirWS;
int l9_37=0;
float4 l9_38=float4(l9_32.bakedShadows,1.0);
if (sc_DirectionalLightsCount_tmp>0)
{
sc_DirectionalLight_t l9_39;
LightProperties l9_40;
int l9_41=0;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_41<sc_DirectionalLightsCount_tmp)
{
l9_39.direction=(*sc_set0.UserUniforms).sc_DirectionalLights[l9_41].direction;
l9_39.color=(*sc_set0.UserUniforms).sc_DirectionalLights[l9_41].color;
l9_40.direction=l9_39.direction;
l9_40.color=l9_39.color.xyz;
l9_40.attenuation=l9_39.color.w;
l9_40.attenuation*=l9_38[(l9_37<3) ? l9_37 : 3];
l9_37++;
LightingComponents l9_42=l9_35;
LightProperties l9_43=l9_40;
SurfaceProperties l9_44=l9_32;
float3 l9_45=l9_36;
SurfaceProperties l9_46=l9_44;
float3 l9_47=l9_43.direction;
float l9_48=dot(l9_46.normal,l9_47);
float l9_49=fast::clamp(l9_48,0.0,1.0);
float3 l9_50=float3(l9_49);
l9_42.directDiffuse+=((l9_50*l9_43.color)*l9_43.attenuation);
SurfaceProperties l9_51=l9_44;
float3 l9_52=l9_43.direction;
float3 l9_53=l9_45;
l9_42.directSpecular+=((calculateDirectSpecular(l9_51,l9_52,l9_53)*l9_43.color)*l9_43.attenuation);
LightingComponents l9_54=l9_42;
l9_35=l9_54;
l9_41++;
continue;
}
else
{
break;
}
}
}
if (sc_PointLightsCount_tmp>0)
{
sc_PointLight_t_1 l9_55;
LightProperties l9_56;
int l9_57=0;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_57<sc_PointLightsCount_tmp)
{
l9_55.falloffEnabled=(*sc_set0.UserUniforms).sc_PointLights[l9_57].falloffEnabled!=0;
l9_55.falloffEndDistance=(*sc_set0.UserUniforms).sc_PointLights[l9_57].falloffEndDistance;
l9_55.negRcpFalloffEndDistance4=(*sc_set0.UserUniforms).sc_PointLights[l9_57].negRcpFalloffEndDistance4;
l9_55.angleScale=(*sc_set0.UserUniforms).sc_PointLights[l9_57].angleScale;
l9_55.angleOffset=(*sc_set0.UserUniforms).sc_PointLights[l9_57].angleOffset;
l9_55.direction=(*sc_set0.UserUniforms).sc_PointLights[l9_57].direction;
l9_55.position=(*sc_set0.UserUniforms).sc_PointLights[l9_57].position;
l9_55.color=(*sc_set0.UserUniforms).sc_PointLights[l9_57].color;
float3 l9_58=l9_55.position-l9_32.positionWS;
l9_56.direction=normalize(l9_58);
l9_56.color=l9_55.color.xyz;
l9_56.attenuation=l9_55.color.w;
l9_56.attenuation*=l9_38[(l9_37<3) ? l9_37 : 3];
float3 l9_59=l9_56.direction;
float3 l9_60=l9_55.direction;
float l9_61=l9_55.angleScale;
float l9_62=l9_55.angleOffset;
float l9_63=dot(l9_59,l9_60);
float l9_64=fast::clamp((l9_63*l9_61)+l9_62,0.0,1.0);
float l9_65=l9_64*l9_64;
l9_56.attenuation*=l9_65;
if (l9_55.falloffEnabled)
{
float l9_66=length(l9_58);
float l9_67=l9_55.falloffEndDistance;
l9_56.attenuation*=computeDistanceAttenuation(l9_66,l9_67);
}
l9_37++;
LightingComponents l9_68=l9_35;
LightProperties l9_69=l9_56;
SurfaceProperties l9_70=l9_32;
float3 l9_71=l9_36;
SurfaceProperties l9_72=l9_70;
float3 l9_73=l9_69.direction;
float l9_74=dot(l9_72.normal,l9_73);
float l9_75=fast::clamp(l9_74,0.0,1.0);
float3 l9_76=float3(l9_75);
l9_68.directDiffuse+=((l9_76*l9_69.color)*l9_69.attenuation);
SurfaceProperties l9_77=l9_70;
float3 l9_78=l9_69.direction;
float3 l9_79=l9_71;
l9_68.directSpecular+=((calculateDirectSpecular(l9_77,l9_78,l9_79)*l9_69.color)*l9_69.attenuation);
LightingComponents l9_80=l9_68;
l9_35=l9_80;
l9_57++;
continue;
}
else
{
break;
}
}
}
if ((int(sc_ProjectiveShadowsReceiver_tmp)!=0))
{
float3 l9_81=float3(0.0);
if ((int(sc_ProjectiveShadowsReceiver_tmp)!=0))
{
float2 l9_82=abs(in.varShadowTex-float2(0.5));
float l9_83=fast::max(l9_82.x,l9_82.y);
float l9_84=step(l9_83,0.5);
float4 l9_85=sc_set0.sc_ShadowTexture.sample(sc_set0.sc_ShadowTextureSmpSC,in.varShadowTex)*l9_84;
float3 l9_86=mix((*sc_set0.UserUniforms).sc_ShadowColor.xyz,(*sc_set0.UserUniforms).sc_ShadowColor.xyz*l9_85.xyz,float3((*sc_set0.UserUniforms).sc_ShadowColor.w));
float l9_87=l9_85.w*(*sc_set0.UserUniforms).sc_ShadowDensity;
l9_81=mix(float3(1.0),l9_86,float3(l9_87));
}
else
{
l9_81=float3(1.0);
}
float3 l9_88=l9_81;
float3 l9_89=l9_88;
l9_35.directDiffuse*=l9_89;
l9_35.directSpecular*=l9_89;
}
bool l9_90=(*sc_set0.UserUniforms).receivesRayTracedShadows!=0;
if (l9_90)
{
float4 l9_91=gl_FragCoord;
float2 l9_92=l9_91.xy*(*sc_set0.UserUniforms).sc_CurrentRenderTargetDims.zw;
float2 l9_93=l9_92;
float2 l9_94=l9_93;
int l9_95=0;
if ((int(sc_RayTracedShadowTextureHasSwappedViews_tmp)!=0))
{
int l9_96=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_96=0;
}
else
{
l9_96=in.varStereoViewID;
}
int l9_97=l9_96;
l9_95=1-l9_97;
}
else
{
int l9_98=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_98=0;
}
else
{
l9_98=in.varStereoViewID;
}
int l9_99=l9_98;
l9_95=l9_99;
}
int l9_100=l9_95;
float2 l9_101=l9_94;
int l9_102=l9_100;
float2 l9_103=l9_101;
int l9_104=l9_102;
float l9_105=0.0;
float4 l9_106=float4(0.0);
float2 l9_107=l9_103;
int l9_108=sc_RayTracedShadowTextureLayout_tmp;
int l9_109=l9_104;
float l9_110=l9_105;
float2 l9_111=l9_107;
int l9_112=l9_108;
int l9_113=l9_109;
float3 l9_114=float3(0.0);
if (l9_112==0)
{
l9_114=float3(l9_111,0.0);
}
else
{
if (l9_112==1)
{
l9_114=float3(l9_111.x,(l9_111.y*0.5)+(0.5-(float(l9_113)*0.5)),0.0);
}
else
{
l9_114=float3(l9_111,float(l9_113));
}
}
float3 l9_115=l9_114;
float3 l9_116=l9_115;
float2 l9_117=l9_116.xy;
float l9_118=l9_110;
float4 l9_119=sc_set0.sc_RayTracedShadowTexture.sample(sc_set0.sc_RayTracedShadowTextureSmpSC,l9_117,bias(l9_118));
float4 l9_120=l9_119;
l9_106=l9_120;
float4 l9_121=l9_106;
float4 l9_122=l9_121;
float4 l9_123=l9_122;
float l9_124=l9_123.x;
float3 l9_125=float3(l9_124);
float3 l9_126=l9_125;
l9_35.directDiffuse*=(float3(1.0)-l9_126);
l9_35.directSpecular*=(float3(1.0)-l9_126);
}
SurfaceProperties l9_127=l9_32;
float3 l9_128=l9_127.normal;
float3 l9_129=float3(0.0);
if ((sc_EnvLightMode_tmp==sc_AmbientLightMode_EnvironmentMap_tmp)||(sc_EnvLightMode_tmp==sc_AmbientLightMode_FromCamera_tmp))
{
float3 l9_130=l9_128;
float3 l9_131=l9_130;
float l9_132=(*sc_set0.UserUniforms).sc_EnvmapRotation.y;
float2 l9_133=float2(0.0);
float l9_134=l9_131.x;
float l9_135=-l9_131.z;
float l9_136=(l9_134<0.0) ? (-1.0) : 1.0;
float l9_137=l9_136*acos(fast::clamp(l9_135/length(float2(l9_134,l9_135)),-1.0,1.0));
l9_133.x=l9_137-1.5707964;
l9_133.y=acos(l9_131.y);
l9_133/=float2(6.2831855,3.1415927);
l9_133.y=1.0-l9_133.y;
l9_133.x+=(l9_132/360.0);
l9_133.x=fract((l9_133.x+floor(l9_133.x))+1.0);
float2 l9_138=l9_133;
float2 l9_139=l9_138;
float4 l9_140=float4(0.0);
if (sc_EnvLightMode_tmp==sc_AmbientLightMode_FromCamera_tmp)
{
if (SC_DEVICE_CLASS_tmp>=2)
{
float2 l9_141=l9_139;
float2 l9_142=(*sc_set0.UserUniforms).sc_EnvmapSpecularSize.xy;
float l9_143=5.0;
l9_139=calcSeamlessPanoramicUvsForSampling(l9_141,l9_142,l9_143);
}
float2 l9_144=l9_139;
float l9_145=13.0;
int l9_146=0;
if ((int(sc_EnvmapSpecularHasSwappedViews_tmp)!=0))
{
int l9_147=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_147=0;
}
else
{
l9_147=in.varStereoViewID;
}
int l9_148=l9_147;
l9_146=1-l9_148;
}
else
{
int l9_149=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_149=0;
}
else
{
l9_149=in.varStereoViewID;
}
int l9_150=l9_149;
l9_146=l9_150;
}
int l9_151=l9_146;
float2 l9_152=l9_144;
int l9_153=l9_151;
float l9_154=l9_145;
float4 l9_155=float4(0.0);
float2 l9_156=l9_152;
int l9_157=sc_EnvmapSpecularLayout_tmp;
int l9_158=l9_153;
float l9_159=l9_154;
float2 l9_160=l9_156;
int l9_161=l9_157;
int l9_162=l9_158;
float3 l9_163=float3(0.0);
if (l9_161==0)
{
l9_163=float3(l9_160,0.0);
}
else
{
if (l9_161==1)
{
l9_163=float3(l9_160.x,(l9_160.y*0.5)+(0.5-(float(l9_162)*0.5)),0.0);
}
else
{
l9_163=float3(l9_160,float(l9_162));
}
}
float3 l9_164=l9_163;
float3 l9_165=l9_164;
float2 l9_166=l9_165.xy;
float l9_167=l9_159;
float4 l9_168=sc_set0.sc_EnvmapSpecular.sample(sc_set0.sc_EnvmapSpecularSmpSC,l9_166,bias(l9_167));
float4 l9_169=l9_168;
l9_155=l9_169;
float4 l9_170=l9_155;
float4 l9_171=l9_170;
l9_140=l9_171;
}
else
{
if ((sc_MaxTextureImageUnits_tmp>8)&&(int(sc_HasDiffuseEnvmap_tmp)!=0))
{
float2 l9_172=l9_139;
float2 l9_173=(*sc_set0.UserUniforms).sc_EnvmapDiffuseSize.xy;
float l9_174=0.0;
l9_139=calcSeamlessPanoramicUvsForSampling(l9_172,l9_173,l9_174);
float2 l9_175=l9_139;
float l9_176=-13.0;
int l9_177=0;
if ((int(sc_EnvmapDiffuseHasSwappedViews_tmp)!=0))
{
int l9_178=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_178=0;
}
else
{
l9_178=in.varStereoViewID;
}
int l9_179=l9_178;
l9_177=1-l9_179;
}
else
{
int l9_180=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_180=0;
}
else
{
l9_180=in.varStereoViewID;
}
int l9_181=l9_180;
l9_177=l9_181;
}
int l9_182=l9_177;
float2 l9_183=l9_175;
int l9_184=l9_182;
float l9_185=l9_176;
float4 l9_186=float4(0.0);
float2 l9_187=l9_183;
int l9_188=sc_EnvmapDiffuseLayout_tmp;
int l9_189=l9_184;
float l9_190=l9_185;
float2 l9_191=l9_187;
int l9_192=l9_188;
int l9_193=l9_189;
float3 l9_194=float3(0.0);
if (l9_192==0)
{
l9_194=float3(l9_191,0.0);
}
else
{
if (l9_192==1)
{
l9_194=float3(l9_191.x,(l9_191.y*0.5)+(0.5-(float(l9_193)*0.5)),0.0);
}
else
{
l9_194=float3(l9_191,float(l9_193));
}
}
float3 l9_195=l9_194;
float3 l9_196=l9_195;
float2 l9_197=l9_196.xy;
float l9_198=l9_190;
float4 l9_199=sc_set0.sc_EnvmapDiffuse.sample(sc_set0.sc_EnvmapDiffuseSmpSC,l9_197,bias(l9_198));
float4 l9_200=l9_199;
l9_186=l9_200;
float4 l9_201=l9_186;
float4 l9_202=l9_201;
l9_140=l9_202;
}
else
{
float2 l9_203=l9_139;
float l9_204=13.0;
int l9_205=0;
if ((int(sc_EnvmapSpecularHasSwappedViews_tmp)!=0))
{
int l9_206=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_206=0;
}
else
{
l9_206=in.varStereoViewID;
}
int l9_207=l9_206;
l9_205=1-l9_207;
}
else
{
int l9_208=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_208=0;
}
else
{
l9_208=in.varStereoViewID;
}
int l9_209=l9_208;
l9_205=l9_209;
}
int l9_210=l9_205;
float2 l9_211=l9_203;
int l9_212=l9_210;
float l9_213=l9_204;
float4 l9_214=float4(0.0);
float2 l9_215=l9_211;
int l9_216=sc_EnvmapSpecularLayout_tmp;
int l9_217=l9_212;
float l9_218=l9_213;
float2 l9_219=l9_215;
int l9_220=l9_216;
int l9_221=l9_217;
float3 l9_222=float3(0.0);
if (l9_220==0)
{
l9_222=float3(l9_219,0.0);
}
else
{
if (l9_220==1)
{
l9_222=float3(l9_219.x,(l9_219.y*0.5)+(0.5-(float(l9_221)*0.5)),0.0);
}
else
{
l9_222=float3(l9_219,float(l9_221));
}
}
float3 l9_223=l9_222;
float3 l9_224=l9_223;
float2 l9_225=l9_224.xy;
float l9_226=l9_218;
float4 l9_227=sc_set0.sc_EnvmapSpecular.sample(sc_set0.sc_EnvmapSpecularSmpSC,l9_225,bias(l9_226));
float4 l9_228=l9_227;
l9_214=l9_228;
float4 l9_229=l9_214;
float4 l9_230=l9_229;
l9_140=l9_230;
}
}
float4 l9_231=l9_140;
float3 l9_232=l9_231.xyz*(1.0/l9_231.w);
float3 l9_233=l9_232*(*sc_set0.UserUniforms).sc_EnvmapExposure;
l9_129=l9_233;
}
else
{
if (sc_EnvLightMode_tmp==sc_AmbientLightMode_SphericalHarmonics_tmp)
{
float3 l9_234=(*sc_set0.UserUniforms).sc_Sh[0];
float3 l9_235=(*sc_set0.UserUniforms).sc_Sh[1];
float3 l9_236=(*sc_set0.UserUniforms).sc_Sh[2];
float3 l9_237=(*sc_set0.UserUniforms).sc_Sh[3];
float3 l9_238=(*sc_set0.UserUniforms).sc_Sh[4];
float3 l9_239=(*sc_set0.UserUniforms).sc_Sh[5];
float3 l9_240=(*sc_set0.UserUniforms).sc_Sh[6];
float3 l9_241=(*sc_set0.UserUniforms).sc_Sh[7];
float3 l9_242=(*sc_set0.UserUniforms).sc_Sh[8];
float3 l9_243=-l9_128;
float l9_244=0.0;
l9_244=l9_243.x;
float l9_245=l9_243.y;
float l9_246=l9_243.z;
float l9_247=l9_244*l9_244;
float l9_248=l9_245*l9_245;
float l9_249=l9_246*l9_246;
float l9_250=l9_244*l9_245;
float l9_251=l9_245*l9_246;
float l9_252=l9_244*l9_246;
float3 l9_253=((((((l9_242*0.42904299)*(l9_247-l9_248))+((l9_240*0.74312502)*l9_249))+(l9_234*0.88622701))-(l9_240*0.24770799))+((((l9_238*l9_250)+(l9_241*l9_252))+(l9_239*l9_251))*0.85808599))+((((l9_237*l9_244)+(l9_235*l9_245))+(l9_236*l9_246))*1.0233279);
l9_129=l9_253*(*sc_set0.UserUniforms).sc_ShIntensity;
}
}
bool l9_254=(*sc_set0.UserUniforms).receivesRayTracedDiffuseIndirect!=0;
if (l9_254)
{
float4 l9_255=sampleRayTracedIndirectDiffuse(in.varStereoViewID,(*sc_set0.UserUniforms),sc_set0.sc_RayTracedDiffIndTexture,sc_set0.sc_RayTracedDiffIndTextureSmpSC,gl_FragCoord);
l9_129=mix(l9_129,l9_255.xyz,float3(l9_255.w));
}
if (sc_AmbientLightsCount_tmp>0)
{
if (sc_AmbientLightMode0_tmp==sc_AmbientLightMode_Constant_tmp)
{
l9_129+=((*sc_set0.UserUniforms).sc_AmbientLights[0].color*(*sc_set0.UserUniforms).sc_AmbientLights[0].intensity);
}
else
{
l9_129.x+=(1e-06*(*sc_set0.UserUniforms).sc_AmbientLights[0].color.x);
}
}
if (sc_AmbientLightsCount_tmp>1)
{
if (sc_AmbientLightMode1_tmp==sc_AmbientLightMode_Constant_tmp)
{
l9_129+=((*sc_set0.UserUniforms).sc_AmbientLights[1].color*(*sc_set0.UserUniforms).sc_AmbientLights[1].intensity);
}
else
{
l9_129.x+=(1e-06*(*sc_set0.UserUniforms).sc_AmbientLights[1].color.x);
}
}
if (sc_AmbientLightsCount_tmp>2)
{
if (sc_AmbientLightMode2_tmp==sc_AmbientLightMode_Constant_tmp)
{
l9_129+=((*sc_set0.UserUniforms).sc_AmbientLights[2].color*(*sc_set0.UserUniforms).sc_AmbientLights[2].intensity);
}
else
{
l9_129.x+=(1e-06*(*sc_set0.UserUniforms).sc_AmbientLights[2].color.x);
}
}
if ((int(sc_LightEstimation_tmp)!=0))
{
float3 l9_256=l9_128;
float3 l9_257=(*sc_set0.UserUniforms).sc_LightEstimationData.ambientLight;
sc_SphericalGaussianLight_t l9_258;
float l9_259;
int l9_260=0;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_260<sc_LightEstimationSGCount_tmp)
{
l9_258.color=(*sc_set0.UserUniforms).sc_LightEstimationData.sg[l9_260].color;
l9_258.sharpness=(*sc_set0.UserUniforms).sc_LightEstimationData.sg[l9_260].sharpness;
l9_258.axis=(*sc_set0.UserUniforms).sc_LightEstimationData.sg[l9_260].axis;
float3 l9_261=l9_256;
float l9_262=dot(l9_258.axis,l9_261);
float l9_263=l9_258.sharpness;
float l9_264=0.36000001;
float l9_265=1.0/(4.0*l9_264);
float l9_266=exp(-l9_263);
float l9_267=l9_266*l9_266;
float l9_268=1.0/l9_263;
float l9_269=(1.0+(2.0*l9_267))-l9_268;
float l9_270=((l9_266-l9_267)*l9_268)-l9_267;
float l9_271=sqrt(1.0-l9_269);
float l9_272=l9_264*l9_262;
float l9_273=l9_265*l9_271;
float l9_274=l9_272+l9_273;
float l9_275=l9_262;
float l9_276=fast::clamp(l9_275,0.0,1.0);
float l9_277=l9_276;
if (step(abs(l9_272),l9_273)>0.5)
{
l9_259=(l9_274*l9_274)/l9_271;
}
else
{
l9_259=l9_277;
}
l9_277=l9_259;
float l9_278=(l9_269*l9_277)+l9_270;
sc_SphericalGaussianLight_t l9_279=l9_258;
float3 l9_280=(l9_279.color/float3(l9_279.sharpness))*6.2831855;
float3 l9_281=(l9_280*l9_278)/float3(3.1415927);
l9_257+=l9_281;
l9_260++;
continue;
}
else
{
break;
}
}
float3 l9_282=l9_257;
l9_129+=l9_282;
}
float3 l9_283=l9_129;
float3 l9_284=l9_283;
l9_35.indirectDiffuse=l9_284;
SurfaceProperties l9_285=l9_32;
float3 l9_286=l9_36;
float3 l9_287=float3(0.0);
if ((sc_EnvLightMode_tmp==sc_AmbientLightMode_EnvironmentMap_tmp)||(sc_EnvLightMode_tmp==sc_AmbientLightMode_FromCamera_tmp))
{
SurfaceProperties l9_288=l9_285;
float3 l9_289=l9_286;
float3 l9_290=l9_288.normal;
float3 l9_291=reflect(-l9_289,l9_290);
float3 l9_292=l9_290;
float3 l9_293=l9_291;
float l9_294=l9_288.roughness;
l9_291=getSpecularDominantDir(l9_292,l9_293,l9_294);
float l9_295=l9_288.roughness;
float l9_296=pow(l9_295,0.66666669);
float l9_297=fast::clamp(l9_296,0.0,1.0);
float l9_298=l9_297*5.0;
float l9_299=l9_298;
float l9_300=l9_299;
float3 l9_301=l9_291;
float l9_302=l9_300;
float3 l9_303=l9_301;
float l9_304=l9_302;
float4 l9_305=float4(0.0);
float3 l9_306=l9_303;
float l9_307=(*sc_set0.UserUniforms).sc_EnvmapRotation.y;
float2 l9_308=float2(0.0);
float l9_309=l9_306.x;
float l9_310=-l9_306.z;
float l9_311=(l9_309<0.0) ? (-1.0) : 1.0;
float l9_312=l9_311*acos(fast::clamp(l9_310/length(float2(l9_309,l9_310)),-1.0,1.0));
l9_308.x=l9_312-1.5707964;
l9_308.y=acos(l9_306.y);
l9_308/=float2(6.2831855,3.1415927);
l9_308.y=1.0-l9_308.y;
l9_308.x+=(l9_307/360.0);
l9_308.x=fract((l9_308.x+floor(l9_308.x))+1.0);
float2 l9_313=l9_308;
float2 l9_314=l9_313;
if (SC_DEVICE_CLASS_tmp>=2)
{
float l9_315=floor(l9_304);
float l9_316=ceil(l9_304);
float l9_317=l9_304-l9_315;
float2 l9_318=l9_314;
float2 l9_319=(*sc_set0.UserUniforms).sc_EnvmapSpecularSize.xy;
float l9_320=l9_315;
float2 l9_321=calcSeamlessPanoramicUvsForSampling(l9_318,l9_319,l9_320);
float2 l9_322=l9_321;
float l9_323=l9_315;
float2 l9_324=l9_322;
float l9_325=l9_323;
int l9_326=0;
if ((int(sc_EnvmapSpecularHasSwappedViews_tmp)!=0))
{
int l9_327=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_327=0;
}
else
{
l9_327=in.varStereoViewID;
}
int l9_328=l9_327;
l9_326=1-l9_328;
}
else
{
int l9_329=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_329=0;
}
else
{
l9_329=in.varStereoViewID;
}
int l9_330=l9_329;
l9_326=l9_330;
}
int l9_331=l9_326;
float2 l9_332=l9_324;
int l9_333=l9_331;
float l9_334=l9_325;
float4 l9_335=float4(0.0);
float2 l9_336=l9_332;
int l9_337=sc_EnvmapSpecularLayout_tmp;
int l9_338=l9_333;
float l9_339=l9_334;
float2 l9_340=l9_336;
int l9_341=l9_337;
int l9_342=l9_338;
float3 l9_343=float3(0.0);
if (l9_341==0)
{
l9_343=float3(l9_340,0.0);
}
else
{
if (l9_341==1)
{
l9_343=float3(l9_340.x,(l9_340.y*0.5)+(0.5-(float(l9_342)*0.5)),0.0);
}
else
{
l9_343=float3(l9_340,float(l9_342));
}
}
float3 l9_344=l9_343;
float3 l9_345=l9_344;
float2 l9_346=l9_345.xy;
float l9_347=l9_339;
float4 l9_348=sc_set0.sc_EnvmapSpecular.sample(sc_set0.sc_EnvmapSpecularSmpSC,l9_346,level(l9_347));
float4 l9_349=l9_348;
l9_335=l9_349;
float4 l9_350=l9_335;
float4 l9_351=l9_350;
float4 l9_352=l9_351;
float4 l9_353=l9_352;
float2 l9_354=l9_314;
float2 l9_355=(*sc_set0.UserUniforms).sc_EnvmapSpecularSize.xy;
float l9_356=l9_316;
float2 l9_357=calcSeamlessPanoramicUvsForSampling(l9_354,l9_355,l9_356);
float2 l9_358=l9_357;
float l9_359=l9_316;
float2 l9_360=l9_358;
float l9_361=l9_359;
int l9_362=0;
if ((int(sc_EnvmapSpecularHasSwappedViews_tmp)!=0))
{
int l9_363=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_363=0;
}
else
{
l9_363=in.varStereoViewID;
}
int l9_364=l9_363;
l9_362=1-l9_364;
}
else
{
int l9_365=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_365=0;
}
else
{
l9_365=in.varStereoViewID;
}
int l9_366=l9_365;
l9_362=l9_366;
}
int l9_367=l9_362;
float2 l9_368=l9_360;
int l9_369=l9_367;
float l9_370=l9_361;
float4 l9_371=float4(0.0);
float2 l9_372=l9_368;
int l9_373=sc_EnvmapSpecularLayout_tmp;
int l9_374=l9_369;
float l9_375=l9_370;
float2 l9_376=l9_372;
int l9_377=l9_373;
int l9_378=l9_374;
float3 l9_379=float3(0.0);
if (l9_377==0)
{
l9_379=float3(l9_376,0.0);
}
else
{
if (l9_377==1)
{
l9_379=float3(l9_376.x,(l9_376.y*0.5)+(0.5-(float(l9_378)*0.5)),0.0);
}
else
{
l9_379=float3(l9_376,float(l9_378));
}
}
float3 l9_380=l9_379;
float3 l9_381=l9_380;
float2 l9_382=l9_381.xy;
float l9_383=l9_375;
float4 l9_384=sc_set0.sc_EnvmapSpecular.sample(sc_set0.sc_EnvmapSpecularSmpSC,l9_382,level(l9_383));
float4 l9_385=l9_384;
l9_371=l9_385;
float4 l9_386=l9_371;
float4 l9_387=l9_386;
float4 l9_388=l9_387;
float4 l9_389=l9_388;
l9_305=mix(l9_353,l9_389,float4(l9_317));
}
else
{
float2 l9_390=l9_314;
float l9_391=l9_304;
float2 l9_392=l9_390;
float l9_393=l9_391;
int l9_394=0;
if ((int(sc_EnvmapSpecularHasSwappedViews_tmp)!=0))
{
int l9_395=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_395=0;
}
else
{
l9_395=in.varStereoViewID;
}
int l9_396=l9_395;
l9_394=1-l9_396;
}
else
{
int l9_397=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_397=0;
}
else
{
l9_397=in.varStereoViewID;
}
int l9_398=l9_397;
l9_394=l9_398;
}
int l9_399=l9_394;
float2 l9_400=l9_392;
int l9_401=l9_399;
float l9_402=l9_393;
float4 l9_403=float4(0.0);
float2 l9_404=l9_400;
int l9_405=sc_EnvmapSpecularLayout_tmp;
int l9_406=l9_401;
float l9_407=l9_402;
float2 l9_408=l9_404;
int l9_409=l9_405;
int l9_410=l9_406;
float3 l9_411=float3(0.0);
if (l9_409==0)
{
l9_411=float3(l9_408,0.0);
}
else
{
if (l9_409==1)
{
l9_411=float3(l9_408.x,(l9_408.y*0.5)+(0.5-(float(l9_410)*0.5)),0.0);
}
else
{
l9_411=float3(l9_408,float(l9_410));
}
}
float3 l9_412=l9_411;
float3 l9_413=l9_412;
float2 l9_414=l9_413.xy;
float l9_415=l9_407;
float4 l9_416=sc_set0.sc_EnvmapSpecular.sample(sc_set0.sc_EnvmapSpecularSmpSC,l9_414,level(l9_415));
float4 l9_417=l9_416;
l9_403=l9_417;
float4 l9_418=l9_403;
float4 l9_419=l9_418;
float4 l9_420=l9_419;
l9_305=l9_420;
}
float4 l9_421=l9_305;
float3 l9_422=l9_421.xyz*(1.0/l9_421.w);
float3 l9_423=l9_422;
float3 l9_424=l9_423*(*sc_set0.UserUniforms).sc_EnvmapExposure;
l9_424+=float3(1e-06);
float3 l9_425=l9_424;
float3 l9_426=l9_425;
bool l9_427=(*sc_set0.UserUniforms).receivesRayTracedReflections!=0;
if (l9_427)
{
float4 l9_428=sampleRayTracedReflections(in.varStereoViewID,(*sc_set0.UserUniforms),sc_set0.sc_RayTracedReflectionTexture,sc_set0.sc_RayTracedReflectionTextureSmpSC,gl_FragCoord);
l9_426=mix(l9_426,l9_428.xyz,float3(l9_428.w));
}
SurfaceProperties l9_429=l9_288;
float l9_430=abs(dot(l9_290,l9_289));
float3 l9_431=l9_426*envBRDFApprox(l9_429,l9_430);
l9_287+=l9_431;
}
if ((int(sc_LightEstimation_tmp)!=0))
{
SurfaceProperties l9_432=l9_285;
float3 l9_433=l9_286;
float l9_434=fast::clamp(l9_432.roughness*l9_432.roughness,0.0099999998,1.0);
float3 l9_435=(*sc_set0.UserUniforms).sc_LightEstimationData.ambientLight*l9_432.specColor;
sc_SphericalGaussianLight_t l9_436;
sc_SphericalGaussianLight_t l9_437;
sc_SphericalGaussianLight_t l9_438;
int l9_439=0;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_439<sc_LightEstimationSGCount_tmp)
{
l9_436.color=(*sc_set0.UserUniforms).sc_LightEstimationData.sg[l9_439].color;
l9_436.sharpness=(*sc_set0.UserUniforms).sc_LightEstimationData.sg[l9_439].sharpness;
l9_436.axis=(*sc_set0.UserUniforms).sc_LightEstimationData.sg[l9_439].axis;
float3 l9_440=l9_432.normal;
float l9_441=l9_434;
float3 l9_442=l9_433;
float3 l9_443=l9_432.specColor;
float3 l9_444=l9_440;
float l9_445=l9_441;
l9_437.axis=l9_444;
float l9_446=l9_445*l9_445;
l9_437.sharpness=2.0/l9_446;
l9_437.color=float3(1.0/(3.1415927*l9_446));
sc_SphericalGaussianLight_t l9_447=l9_437;
sc_SphericalGaussianLight_t l9_448=l9_447;
sc_SphericalGaussianLight_t l9_449=l9_448;
float3 l9_450=l9_442;
l9_438.axis=reflect(-l9_450,l9_449.axis);
l9_438.color=l9_449.color;
l9_438.sharpness=l9_449.sharpness;
l9_438.sharpness/=(4.0*fast::max(dot(l9_449.axis,l9_450),9.9999997e-05));
sc_SphericalGaussianLight_t l9_451=l9_438;
sc_SphericalGaussianLight_t l9_452=l9_451;
sc_SphericalGaussianLight_t l9_453=l9_452;
sc_SphericalGaussianLight_t l9_454=l9_436;
float l9_455=length((l9_453.axis*l9_453.sharpness)+(l9_454.axis*l9_454.sharpness));
float3 l9_456=(l9_453.color*exp((l9_455-l9_453.sharpness)-l9_454.sharpness))*l9_454.color;
float l9_457=1.0-exp((-2.0)*l9_455);
float3 l9_458=((l9_456*6.2831855)*l9_457)/float3(l9_455);
float3 l9_459=l9_458;
float3 l9_460=l9_452.axis;
float l9_461=l9_441*l9_441;
float l9_462=dot(l9_440,l9_460);
float l9_463=fast::clamp(l9_462,0.0,1.0);
float l9_464=l9_463;
float l9_465=dot(l9_440,l9_442);
float l9_466=fast::clamp(l9_465,0.0,1.0);
float l9_467=l9_466;
float3 l9_468=normalize(l9_452.axis+l9_442);
float l9_469=l9_461;
float l9_470=l9_464;
float l9_471=1.0/(l9_470+sqrt(l9_469+(((1.0-l9_469)*l9_470)*l9_470)));
float l9_472=l9_461;
float l9_473=l9_467;
float l9_474=1.0/(l9_473+sqrt(l9_472+(((1.0-l9_472)*l9_473)*l9_473)));
l9_459*=(l9_471*l9_474);
float l9_475=dot(l9_460,l9_468);
float l9_476=fast::clamp(l9_475,0.0,1.0);
float l9_477=pow(1.0-l9_476,5.0);
l9_459*=(l9_443+((float3(1.0)-l9_443)*l9_477));
l9_459*=l9_464;
float3 l9_478=l9_459;
l9_435+=l9_478;
l9_439++;
continue;
}
else
{
break;
}
}
float3 l9_479=l9_435;
l9_287+=l9_479;
}
float3 l9_480=l9_287;
l9_35.indirectSpecular=l9_480;
LightingComponents l9_481=l9_35;
LightingComponents l9_482=l9_481;
if ((int(sc_BlendMode_ColoredGlass_tmp)!=0))
{
l9_482.directDiffuse=float3(0.0);
l9_482.indirectDiffuse=float3(0.0);
float4 l9_483=float4(0.0);
if ((int(sc_FramebufferFetch_tmp)!=0))
{
float4 l9_484=out.FragColor0;
float4 l9_485=l9_484;
if ((int(sc_UseFramebufferFetchMarker_tmp)!=0))
{
l9_485.x+=(*sc_set0.UserUniforms)._sc_framebufferFetchMarker;
}
float4 l9_486=l9_485;
l9_483=l9_486;
}
else
{
float4 l9_487=gl_FragCoord;
float2 l9_488=l9_487.xy*(*sc_set0.UserUniforms).sc_CurrentRenderTargetDims.zw;
float2 l9_489=l9_488;
float2 l9_490=float2(0.0);
if (sc_StereoRenderingMode_tmp==1)
{
int l9_491=1;
int l9_492=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_492=0;
}
else
{
l9_492=in.varStereoViewID;
}
int l9_493=l9_492;
int l9_494=l9_493;
float3 l9_495=float3(l9_489,0.0);
int l9_496=l9_491;
int l9_497=l9_494;
if (l9_496==1)
{
l9_495.y=((2.0*l9_495.y)+float(l9_497))-1.0;
}
float2 l9_498=l9_495.xy;
l9_490=l9_498;
}
else
{
l9_490=l9_489;
}
float2 l9_499=l9_490;
float2 l9_500=l9_499;
float2 l9_501=l9_500;
int l9_502=0;
if ((int(sc_ScreenTextureHasSwappedViews_tmp)!=0))
{
int l9_503=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_503=0;
}
else
{
l9_503=in.varStereoViewID;
}
int l9_504=l9_503;
l9_502=1-l9_504;
}
else
{
int l9_505=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_505=0;
}
else
{
l9_505=in.varStereoViewID;
}
int l9_506=l9_505;
l9_502=l9_506;
}
int l9_507=l9_502;
float2 l9_508=l9_501;
int l9_509=l9_507;
float2 l9_510=l9_508;
int l9_511=l9_509;
float l9_512=0.0;
float4 l9_513=float4(0.0);
float2 l9_514=l9_510;
int l9_515=sc_ScreenTextureLayout_tmp;
int l9_516=l9_511;
float l9_517=l9_512;
float2 l9_518=l9_514;
int l9_519=l9_515;
int l9_520=l9_516;
float3 l9_521=float3(0.0);
if (l9_519==0)
{
l9_521=float3(l9_518,0.0);
}
else
{
if (l9_519==1)
{
l9_521=float3(l9_518.x,(l9_518.y*0.5)+(0.5-(float(l9_520)*0.5)),0.0);
}
else
{
l9_521=float3(l9_518,float(l9_520));
}
}
float3 l9_522=l9_521;
float3 l9_523=l9_522;
float2 l9_524=l9_523.xy;
float l9_525=l9_517;
float4 l9_526=sc_set0.sc_ScreenTexture.sample(sc_set0.sc_ScreenTextureSmpSC,l9_524,bias(l9_525));
float4 l9_527=l9_526;
l9_513=l9_527;
float4 l9_528=l9_513;
float4 l9_529=l9_528;
float4 l9_530=l9_529;
l9_483=l9_530;
}
float4 l9_531=l9_483;
float4 l9_532=l9_531;
float3 l9_533=l9_532.xyz;
float3 l9_534;
if (SC_DEVICE_CLASS_tmp>=2)
{
l9_534=float3(pow(l9_533.x,2.2),pow(l9_533.y,2.2),pow(l9_533.z,2.2));
}
else
{
l9_534=l9_533*l9_533;
}
float3 l9_535=l9_534;
float3 l9_536=l9_535;
l9_482.transmitted=l9_536*mix(float3(1.0),l9_19.albedo,float3(l9_19.opacity));
l9_19.opacity=1.0;
}
bool l9_537=false;
if ((int(sc_BlendMode_PremultipliedAlpha_tmp)!=0))
{
l9_537=true;
}
SurfaceProperties l9_538=l9_19;
LightingComponents l9_539=l9_482;
bool l9_540=l9_537;
float3 l9_541=float3(0.0);
bool l9_542=(*sc_set0.UserUniforms).receivesRayTracedAo!=0;
if (l9_542)
{
l9_541=l9_538.albedo*(l9_539.directDiffuse+(l9_539.indirectDiffuse*float3(1.0-sampleRayTracedAo(in.varStereoViewID,(*sc_set0.UserUniforms),sc_set0.sc_RayTracedAoTexture,sc_set0.sc_RayTracedAoTextureSmpSC,gl_FragCoord))));
}
else
{
l9_541=l9_538.albedo*(l9_539.directDiffuse+(l9_539.indirectDiffuse*l9_538.ao));
}
float3 l9_543=l9_539.directSpecular+(l9_539.indirectSpecular*l9_538.specularAo);
float3 l9_544=l9_538.emissive;
float3 l9_545=l9_539.transmitted;
if (l9_540)
{
float l9_546=l9_538.opacity;
l9_541*=srgbToLinear(l9_546);
}
float3 l9_547=((l9_541+l9_543)+l9_544)+l9_545;
float3 l9_548=l9_547;
float4 l9_549=float4(l9_548,l9_19.opacity);
if (!(int(sc_BlendMode_Multiply_tmp)!=0))
{
float3 l9_550=l9_549.xyz;
float l9_551=1.8;
float l9_552=1.4;
float l9_553=0.5;
float l9_554=1.5;
float3 l9_555=(l9_550*((l9_550*l9_551)+float3(l9_552)))/((l9_550*((l9_550*l9_551)+float3(l9_553)))+float3(l9_554));
l9_549=float4(l9_555.x,l9_555.y,l9_555.z,l9_549.w);
}
float3 l9_556=l9_549.xyz;
float l9_557=l9_556.x;
float l9_558=l9_556.y;
float l9_559=l9_556.z;
float3 l9_560=float3(linearToSrgb(l9_557),linearToSrgb(l9_558),linearToSrgb(l9_559));
l9_549=float4(l9_560.x,l9_560.y,l9_560.z,l9_549.w);
float4 l9_561=l9_549;
param_15=l9_561;
}
param_15=fast::max(param_15,float4(0.0));
Output_N0=param_15;
float Output_N98=0.0;
Output_N98=length(Output_N99);
float Output_N105=0.0;
Output_N105=float(Output_N98>(*sc_set0.UserUniforms).Port_Input1_N105);
float4 Output_N104=float4(0.0);
float4 param_17=Output_N0;
float param_18=Output_N105;
float4 param_19=param_17;
if ((param_18*1.0)!=0.0)
{
discard_fragment();
}
Output_N104=param_19;
FinalColor=Output_N104;
float4 param_20=FinalColor;
if ((int(sc_ProjectiveShadowsCaster_tmp)!=0))
{
float4 l9_562=param_20;
float4 l9_563=l9_562;
float l9_564=1.0;
if ((((int(sc_BlendMode_Normal_tmp)!=0)||(int(sc_BlendMode_AlphaToCoverage_tmp)!=0))||(int(sc_BlendMode_PremultipliedAlphaHardware_tmp)!=0))||(int(sc_BlendMode_PremultipliedAlphaAuto_tmp)!=0))
{
l9_564=l9_563.w;
}
else
{
if ((int(sc_BlendMode_PremultipliedAlpha_tmp)!=0))
{
l9_564=fast::clamp(l9_563.w*2.0,0.0,1.0);
}
else
{
if ((int(sc_BlendMode_AddWithAlphaFactor_tmp)!=0))
{
l9_564=fast::clamp(dot(l9_563.xyz,float3(l9_563.w)),0.0,1.0);
}
else
{
if ((int(sc_BlendMode_AlphaTest_tmp)!=0))
{
l9_564=1.0;
}
else
{
if ((int(sc_BlendMode_Multiply_tmp)!=0))
{
l9_564=(1.0-dot(l9_563.xyz,float3(0.33333001)))*l9_563.w;
}
else
{
if ((int(sc_BlendMode_MultiplyOriginal_tmp)!=0))
{
l9_564=(1.0-fast::clamp(dot(l9_563.xyz,float3(1.0)),0.0,1.0))*l9_563.w;
}
else
{
if ((int(sc_BlendMode_ColoredGlass_tmp)!=0))
{
l9_564=fast::clamp(dot(l9_563.xyz,float3(1.0)),0.0,1.0)*l9_563.w;
}
else
{
if ((int(sc_BlendMode_Add_tmp)!=0))
{
l9_564=fast::clamp(dot(l9_563.xyz,float3(1.0)),0.0,1.0);
}
else
{
if ((int(sc_BlendMode_AddWithAlphaFactor_tmp)!=0))
{
l9_564=fast::clamp(dot(l9_563.xyz,float3(1.0)),0.0,1.0)*l9_563.w;
}
else
{
if ((int(sc_BlendMode_Screen_tmp)!=0))
{
l9_564=dot(l9_563.xyz,float3(0.33333001))*l9_563.w;
}
else
{
if ((int(sc_BlendMode_Min_tmp)!=0))
{
l9_564=1.0-fast::clamp(dot(l9_563.xyz,float3(1.0)),0.0,1.0);
}
else
{
if ((int(sc_BlendMode_Max_tmp)!=0))
{
l9_564=fast::clamp(dot(l9_563.xyz,float3(1.0)),0.0,1.0);
}
}
}
}
}
}
}
}
}
}
}
}
float l9_565=l9_564;
float l9_566=l9_565;
float l9_567=(*sc_set0.UserUniforms).sc_ShadowDensity*l9_566;
float3 l9_568=mix((*sc_set0.UserUniforms).sc_ShadowColor.xyz,(*sc_set0.UserUniforms).sc_ShadowColor.xyz*l9_562.xyz,float3((*sc_set0.UserUniforms).sc_ShadowColor.w));
float4 l9_569=float4(l9_568.x,l9_568.y,l9_568.z,l9_567);
param_20=l9_569;
}
else
{
if ((int(sc_RenderAlphaToColor_tmp)!=0))
{
param_20=float4(param_20.w);
}
else
{
if ((int(sc_BlendMode_Custom_tmp)!=0))
{
float4 l9_570=param_20;
float4 l9_571=float4(0.0);
float4 l9_572=float4(0.0);
if ((int(sc_FramebufferFetch_tmp)!=0))
{
float4 l9_573=out.FragColor0;
float4 l9_574=l9_573;
if ((int(sc_UseFramebufferFetchMarker_tmp)!=0))
{
l9_574.x+=(*sc_set0.UserUniforms)._sc_framebufferFetchMarker;
}
float4 l9_575=l9_574;
l9_572=l9_575;
}
else
{
float4 l9_576=gl_FragCoord;
float2 l9_577=l9_576.xy*(*sc_set0.UserUniforms).sc_CurrentRenderTargetDims.zw;
float2 l9_578=l9_577;
float2 l9_579=float2(0.0);
if (sc_StereoRenderingMode_tmp==1)
{
int l9_580=1;
int l9_581=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_581=0;
}
else
{
l9_581=in.varStereoViewID;
}
int l9_582=l9_581;
int l9_583=l9_582;
float3 l9_584=float3(l9_578,0.0);
int l9_585=l9_580;
int l9_586=l9_583;
if (l9_585==1)
{
l9_584.y=((2.0*l9_584.y)+float(l9_586))-1.0;
}
float2 l9_587=l9_584.xy;
l9_579=l9_587;
}
else
{
l9_579=l9_578;
}
float2 l9_588=l9_579;
float2 l9_589=l9_588;
float2 l9_590=l9_589;
int l9_591=0;
if ((int(sc_ScreenTextureHasSwappedViews_tmp)!=0))
{
int l9_592=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_592=0;
}
else
{
l9_592=in.varStereoViewID;
}
int l9_593=l9_592;
l9_591=1-l9_593;
}
else
{
int l9_594=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_594=0;
}
else
{
l9_594=in.varStereoViewID;
}
int l9_595=l9_594;
l9_591=l9_595;
}
int l9_596=l9_591;
float2 l9_597=l9_590;
int l9_598=l9_596;
float2 l9_599=l9_597;
int l9_600=l9_598;
float l9_601=0.0;
float4 l9_602=float4(0.0);
float2 l9_603=l9_599;
int l9_604=sc_ScreenTextureLayout_tmp;
int l9_605=l9_600;
float l9_606=l9_601;
float2 l9_607=l9_603;
int l9_608=l9_604;
int l9_609=l9_605;
float3 l9_610=float3(0.0);
if (l9_608==0)
{
l9_610=float3(l9_607,0.0);
}
else
{
if (l9_608==1)
{
l9_610=float3(l9_607.x,(l9_607.y*0.5)+(0.5-(float(l9_609)*0.5)),0.0);
}
else
{
l9_610=float3(l9_607,float(l9_609));
}
}
float3 l9_611=l9_610;
float3 l9_612=l9_611;
float2 l9_613=l9_612.xy;
float l9_614=l9_606;
float4 l9_615=sc_set0.sc_ScreenTexture.sample(sc_set0.sc_ScreenTextureSmpSC,l9_613,bias(l9_614));
float4 l9_616=l9_615;
l9_602=l9_616;
float4 l9_617=l9_602;
float4 l9_618=l9_617;
float4 l9_619=l9_618;
l9_572=l9_619;
}
float4 l9_620=l9_572;
float4 l9_621=l9_620;
float3 l9_622=l9_621.xyz;
float3 l9_623=l9_622;
float3 l9_624=l9_570.xyz;
float3 l9_625=definedBlend(l9_623,l9_624,in.varStereoViewID,(*sc_set0.UserUniforms),sc_set0.intensityTexture,sc_set0.intensityTextureSmpSC);
l9_571=float4(l9_625.x,l9_625.y,l9_625.z,l9_571.w);
float3 l9_626=mix(l9_622,l9_571.xyz,float3(l9_570.w));
l9_571=float4(l9_626.x,l9_626.y,l9_626.z,l9_571.w);
l9_571.w=1.0;
float4 l9_627=l9_571;
param_20=l9_627;
}
else
{
float4 l9_628=param_20;
float4 l9_629=float4(0.0);
if ((int(sc_BlendMode_MultiplyOriginal_tmp)!=0))
{
l9_629=float4(mix(float3(1.0),l9_628.xyz,float3(l9_628.w)),l9_628.w);
}
else
{
if ((int(sc_BlendMode_Screen_tmp)!=0)||(int(sc_BlendMode_PremultipliedAlphaAuto_tmp)!=0))
{
float l9_630=l9_628.w;
if ((int(sc_BlendMode_PremultipliedAlphaAuto_tmp)!=0))
{
l9_630=fast::clamp(l9_630,0.0,1.0);
}
l9_629=float4(l9_628.xyz*l9_630,l9_630);
}
else
{
l9_629=l9_628;
}
}
float4 l9_631=l9_629;
param_20=l9_631;
}
}
}
float4 l9_632=param_20;
FinalColor=l9_632;
if ((*sc_set0.UserUniforms).PreviewEnabled==1)
{
if (PreviewInfo.Saved)
{
FinalColor=float4(PreviewInfo.Color);
}
else
{
FinalColor=float4(0.0);
}
}
float4 l9_633=float4(0.0);
if ((int(sc_ShaderComplexityAnalyzer_tmp)!=0))
{
l9_633=float4((*sc_set0.UserUniforms).shaderComplexityValue/255.0,0.0,0.0,1.0);
}
else
{
l9_633=float4(0.0);
}
float4 l9_634=l9_633;
float4 Cost=l9_634;
if (Cost.w>0.0)
{
FinalColor=Cost;
}
FinalColor=fast::max(FinalColor,float4(0.0));
float3 param_21=in.varPos;
float4 param_22=FinalColor;
FinalColor=outputMotionVectorsIfNeeded(param_21,param_22,in.varStereoViewID,(*sc_set0.UserUniforms));
float4 param_23=FinalColor;
float4 l9_635=param_23;
if (sc_ShaderCacheConstant_tmp!=0)
{
l9_635.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
out.FragColor0=l9_635;
return out;
}
} // FRAGMENT SHADER

namespace SNAP_RECV {
struct ssGlobals
{
float gTimeElapsed;
float gTimeDelta;
float gTimeElapsedShifted;
float3 BumpedNormal;
float3 ViewDirWS;
float3 PositionWS;
float2 Surface_UVCoord0;
};
struct sc_PointLight_t
{
int falloffEnabled;
float falloffEndDistance;
float negRcpFalloffEndDistance4;
float angleScale;
float angleOffset;
float3 direction;
float3 position;
float4 color;
};
struct sc_DirectionalLight_t
{
float3 direction;
float4 color;
};
struct sc_AmbientLight_t
{
float3 color;
float intensity;
};
struct sc_SphericalGaussianLight_t
{
float3 color;
float sharpness;
float3 axis;
};
struct sc_LightEstimationData_t
{
sc_SphericalGaussianLight_t sg[12];
float3 ambientLight;
};
struct sc_Camera_t
{
float3 position;
float aspect;
float2 clipPlanes;
};
struct userUniformsObj
{
sc_PointLight_t sc_PointLights[3];
sc_DirectionalLight_t sc_DirectionalLights[5];
sc_AmbientLight_t sc_AmbientLights[3];
sc_LightEstimationData_t sc_LightEstimationData;
float4 sc_EnvmapDiffuseSize;
float4 sc_EnvmapDiffuseDims;
float4 sc_EnvmapDiffuseView;
float4 sc_EnvmapSpecularSize;
float4 sc_EnvmapSpecularDims;
float4 sc_EnvmapSpecularView;
float3 sc_EnvmapRotation;
float sc_EnvmapExposure;
float3 sc_Sh[9];
float sc_ShIntensity;
float4 sc_Time;
float4 sc_UniformConstants;
float4 sc_GeometryInfo;
float4x4 sc_ModelViewProjectionMatrixArray[2];
float4x4 sc_ModelViewProjectionMatrixInverseArray[2];
float4x4 sc_ViewProjectionMatrixArray[2];
float4x4 sc_ViewProjectionMatrixInverseArray[2];
float4x4 sc_ModelViewMatrixArray[2];
float4x4 sc_ModelViewMatrixInverseArray[2];
float3x3 sc_ViewNormalMatrixArray[2];
float3x3 sc_ViewNormalMatrixInverseArray[2];
float4x4 sc_ProjectionMatrixArray[2];
float4x4 sc_ProjectionMatrixInverseArray[2];
float4x4 sc_ViewMatrixArray[2];
float4x4 sc_ViewMatrixInverseArray[2];
float4x4 sc_PrevFrameViewProjectionMatrixArray[2];
float4x4 sc_ModelMatrix;
float4x4 sc_ModelMatrixInverse;
float3x3 sc_NormalMatrix;
float3x3 sc_NormalMatrixInverse;
float4x4 sc_PrevFrameModelMatrix;
float4x4 sc_PrevFrameModelMatrixInverse;
float3 sc_LocalAabbMin;
float3 sc_LocalAabbMax;
float3 sc_WorldAabbMin;
float3 sc_WorldAabbMax;
float4 sc_WindowToViewportTransform;
float4 sc_CurrentRenderTargetDims;
sc_Camera_t sc_Camera;
float sc_ShadowDensity;
float4 sc_ShadowColor;
float4x4 sc_ProjectorMatrix;
float _sc_GetFramebufferColorInvalidUsageMarker;
float shaderComplexityValue;
float sc_DisableFrustumCullingMarker;
float4 weights0;
float4 weights1;
float4 weights2;
float4 sc_StereoClipPlanes[2];
int sc_FallbackInstanceID;
float _sc_framebufferFetchMarker;
float2 sc_TAAJitterOffset;
float strandWidth;
float strandTaper;
float4 sc_StrandDataMapTextureSize;
float clumpInstanceCount;
float clumpRadius;
float clumpTipScale;
float hairstyleInstanceCount;
float hairstyleNoise;
float4 sc_ScreenTextureSize;
float4 sc_ScreenTextureDims;
float4 sc_ScreenTextureView;
int receivesRayTracedReflections;
int receivesRayTracedShadows;
int receivesRayTracedDiffuseIndirect;
int receivesRayTracedAo;
float4 sc_RayTracedReflectionTextureSize;
float4 sc_RayTracedReflectionTextureDims;
float4 sc_RayTracedReflectionTextureView;
float4 sc_RayTracedShadowTextureSize;
float4 sc_RayTracedShadowTextureDims;
float4 sc_RayTracedShadowTextureView;
float4 sc_RayTracedDiffIndTextureSize;
float4 sc_RayTracedDiffIndTextureDims;
float4 sc_RayTracedDiffIndTextureView;
float4 sc_RayTracedAoTextureSize;
float4 sc_RayTracedAoTextureDims;
float4 sc_RayTracedAoTextureView;
float receiver_mask;
float3 OriginNormalizationScale;
float3 OriginNormalizationScaleInv;
float3 OriginNormalizationOffset;
int receiverId;
float correctedIntensity;
float4 intensityTextureSize;
float4 intensityTextureDims;
float4 intensityTextureView;
float3x3 intensityTextureTransform;
float4 intensityTextureUvMinMax;
float4 intensityTextureBorderColor;
float reflBlurWidth;
float reflBlurMinRough;
float reflBlurMaxRough;
int overrideTimeEnabled;
float overrideTimeElapsed[32];
float overrideTimeDelta;
int PreviewEnabled;
int PreviewNodeID;
float alphaTestThreshold;
float4 baseColor;
float Port_Value_N044;
float Port_Multiplier_N086;
float Port_Value_N073;
float Port_Scale_N083;
float Port_RangeMinB_N085;
float Port_RangeMaxB_N085;
float Port_Input1_N045;
float Port_Input1_N046;
float2 Port_Input1_N041;
float2 Port_Input1_N099;
float Port_Value2_N100;
float Port_Opacity_N000;
float3 Port_Emissive_N000;
float Port_Value_N001;
float Port_Value_N002;
float3 Port_AO_N000;
float3 Port_SpecularAO_N000;
float Port_Input1_N105;
};
struct sc_Bone_t
{
float4 boneMatrix[3];
float4 normalMatrix[3];
};
struct sc_Bones_obj
{
sc_Bone_t sc_Bones[1];
};
struct sc_Set0
{
constant sc_Bones_obj* sc_BonesUBO [[id(0)]];
texture2d<float> intensityTexture [[id(1)]];
texture2d<float> sc_EnvmapDiffuse [[id(2)]];
texture2d<float> sc_EnvmapSpecular [[id(3)]];
texture2d<float> sc_RayTracedAoTexture [[id(12)]];
texture2d<float> sc_RayTracedDiffIndTexture [[id(13)]];
texture2d<float> sc_RayTracedReflectionTexture [[id(14)]];
texture2d<float> sc_RayTracedShadowTexture [[id(15)]];
texture2d<float> sc_SSAOTexture [[id(16)]];
texture2d<float> sc_ScreenTexture [[id(17)]];
texture2d<float> sc_ShadowTexture [[id(18)]];
sampler intensityTextureSmpSC [[id(20)]];
sampler sc_EnvmapDiffuseSmpSC [[id(21)]];
sampler sc_EnvmapSpecularSmpSC [[id(22)]];
sampler sc_RayTracedAoTextureSmpSC [[id(24)]];
sampler sc_RayTracedDiffIndTextureSmpSC [[id(25)]];
sampler sc_RayTracedReflectionTextureSmpSC [[id(26)]];
sampler sc_RayTracedShadowTextureSmpSC [[id(27)]];
sampler sc_SSAOTextureSmpSC [[id(28)]];
sampler sc_ScreenTextureSmpSC [[id(29)]];
sampler sc_ShadowTextureSmpSC [[id(30)]];
constant userUniformsObj* UserUniforms [[id(32)]];
};
struct main_recv_out
{
uint4 position_and_mask [[color(0)]];
uint4 normal_and_more [[color(1)]];
};
struct main_recv_in
{
float3 varPos [[user(locn0)]];
float3 varNormal [[user(locn1)]];
float4 varTangent [[user(locn2)]];
float4 varPackedTex [[user(locn3)]];
float4 varScreenPos [[user(locn4)]];
float2 varScreenTexturePos [[user(locn5)]];
float varViewSpaceDepth [[user(locn6)]];
float2 varShadowTex [[user(locn7)]];
int varStereoViewID [[user(locn8)]];
float varClipDistance [[user(locn9)]];
float4 varColor [[user(locn10)]];
float4 PreviewVertexColor [[user(locn11)]];
float PreviewVertexSaved [[user(locn12)]];
};
// Implementation of the GLSL mod() function,which is slightly different than Metal fmod()
template<typename Tx,typename Ty>
Tx mod(Tx x,Ty y)
{
return x-y*floor(x/y);
}
fragment main_recv_out main_recv(main_recv_in in [[stage_in]],constant sc_Set0& sc_set0 [[buffer(0)]],float4 gl_FragCoord [[position]])
{
main_recv_out out={};
if ((int(sc_DepthOnly_tmp)!=0))
{
return out;
}
ssGlobals Globals;
Globals.gTimeElapsed=(*sc_set0.UserUniforms).sc_Time.x;
Globals.gTimeDelta=(*sc_set0.UserUniforms).sc_Time.y;
Globals.BumpedNormal=float3(0.0);
Globals.ViewDirWS=normalize((*sc_set0.UserUniforms).sc_Camera.position-in.varPos);
Globals.PositionWS=in.varPos;
Globals.Surface_UVCoord0=in.varPackedTex.xy;
float2 UVCoord_N42=float2(0.0);
UVCoord_N42=Globals.Surface_UVCoord0;
float2 Output_N41=float2(0.0);
Output_N41=UVCoord_N42-(*sc_set0.UserUniforms).Port_Input1_N041;
float2 Output_N99=float2(0.0);
Output_N99=Output_N41*(*sc_set0.UserUniforms).Port_Input1_N099;
float3 Value_N100=float3(0.0);
Value_N100=float3(Output_N99.x,Output_N99.y,Value_N100.z);
Value_N100.z=(*sc_set0.UserUniforms).Port_Value2_N100;
float3 Output_N101=float3(0.0);
float3 param=Value_N100;
float l9_0=dot(param,param);
float l9_1;
if (l9_0>0.0)
{
l9_1=1.0/sqrt(l9_0);
}
else
{
l9_1=0.0;
}
float l9_2=l9_1;
float3 param_1=param*l9_2;
Output_N101=param_1;
float3 VectorOut_N106=float3(0.0);
VectorOut_N106=((*sc_set0.UserUniforms).sc_ModelMatrix*float4(Output_N101,1.0)).xyz;
float Output_N2=0.0;
float param_2=(*sc_set0.UserUniforms).Port_Value_N002;
float param_3=param_2+0.001;
param_3-=0.001;
Output_N2=param_3;
float param_4=(*sc_set0.UserUniforms).Port_Opacity_N000;
float3 param_5=VectorOut_N106;
float param_6=Output_N2;
ssGlobals param_7=Globals;
if (!(int(sc_ProjectiveShadowsCaster_tmp)!=0))
{
param_7.BumpedNormal=param_5;
}
float l9_3=param_4;
if ((int(sc_BlendMode_AlphaTest_tmp)!=0))
{
if (l9_3<(*sc_set0.UserUniforms).alphaTestThreshold)
{
discard_fragment();
}
}
if ((int(ENABLE_STIPPLE_PATTERN_TEST_tmp)!=0))
{
float4 l9_4=gl_FragCoord;
float2 l9_5=floor(mod(l9_4.xy,float2(4.0)));
float l9_6=(mod(dot(l9_5,float2(4.0,1.0))*9.0,16.0)+1.0)/17.0;
if (l9_3<l9_6)
{
discard_fragment();
}
}
float3 l9_7=param_7.PositionWS;
float3 l9_8=param_7.BumpedNormal;
float l9_9=param_6;
float3 l9_10=normalize((*sc_set0.UserUniforms).sc_Camera.position-l9_7);
if (dot(l9_10,l9_8)>=(-0.050000001))
{
uint3 l9_11=uint3(round((l9_7-(*sc_set0.UserUniforms).OriginNormalizationOffset)*(*sc_set0.UserUniforms).OriginNormalizationScale));
out.position_and_mask=uint4(l9_11.x,l9_11.y,l9_11.z,out.position_and_mask.w);
out.position_and_mask.w=uint((*sc_set0.UserUniforms).receiver_mask);
float3 l9_12=l9_8;
float l9_13=dot(abs(l9_12),float3(1.0));
l9_12/=float3(l9_13);
float l9_14=fast::clamp(-l9_12.z,0.0,1.0);
float2 l9_15=l9_12.xy;
float l9_16;
if (l9_12.x>=0.0)
{
l9_16=l9_14;
}
else
{
l9_16=-l9_14;
}
l9_15.x+=l9_16;
float l9_17;
if (l9_12.y>=0.0)
{
l9_17=l9_14;
}
else
{
l9_17=-l9_14;
}
l9_15.y+=l9_17;
float2 l9_18=l9_15;
float2 l9_19=l9_18;
uint2 l9_20=uint2(as_type<uint>(half2(float2(l9_19.x,0.0))),as_type<uint>(half2(float2(l9_19.y,0.0))));
out.normal_and_more=uint4(l9_20.x,l9_20.y,out.normal_and_more.z,out.normal_and_more.w);
out.normal_and_more.z=as_type<uint>(half2(float2(0.0)));
uint l9_21;
if (l9_9<0.0)
{
l9_21=1023u;
}
else
{
l9_21=uint(fast::clamp(l9_9,0.0,1.0)*1000.0);
}
uint l9_22=l9_21;
l9_22 |= uint(((*sc_set0.UserUniforms).receiverId%32)<<int(10u));
out.normal_and_more.w=l9_22;
}
else
{
out.position_and_mask=uint4(0u);
out.normal_and_more=uint4(0u);
}
float Output_N98=0.0;
Output_N98=length(Output_N99);
float Output_N105=0.0;
Output_N105=float(Output_N98>(*sc_set0.UserUniforms).Port_Input1_N105);
float param_8=Output_N105;
if ((param_8*1.0)!=0.0)
{
discard_fragment();
}
return out;
}
} // RECEIVER MODE SHADER
