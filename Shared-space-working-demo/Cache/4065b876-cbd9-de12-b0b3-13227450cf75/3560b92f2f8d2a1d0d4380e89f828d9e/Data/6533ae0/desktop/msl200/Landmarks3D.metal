#include <metal_stdlib>
#include <simd/simd.h>
using namespace metal;
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
// SCC_BACKEND_SHADER_FLAGS_BEGIN__
// SCC_BACKEND_SHADER_FLAG_DISABLE_FRUSTUM_CULLING
// SCC_BACKEND_SHADER_FLAGS_END__
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
//output uvec4 sc_RayTracingPositionAndMask 0
//output uvec4 sc_RayTracingNormalAndMore 1
//sampler sampler intensityTextureSmpSC 0:19
//sampler sampler sc_EnvmapDiffuseSmpSC 0:20
//sampler sampler sc_EnvmapSpecularSmpSC 0:21
//sampler sampler sc_RayTracingGlobalIlluminationSmpSC 0:23
//sampler sampler sc_RayTracingReflectionsSmpSC 0:24
//sampler sampler sc_RayTracingShadowsSmpSC 0:25
//sampler sampler sc_SSAOTextureSmpSC 0:26
//sampler sampler sc_ScreenTextureSmpSC 0:27
//sampler sampler sc_ShadowTextureSmpSC 0:28
//texture texture2D intensityTexture 0:1:0:19
//texture texture2D sc_EnvmapDiffuse 0:2:0:20
//texture texture2D sc_EnvmapSpecular 0:3:0:21
//texture texture2D sc_RayTracingGlobalIllumination 0:12:0:23
//texture texture2D sc_RayTracingReflections 0:13:0:24
//texture texture2D sc_RayTracingShadows 0:14:0:25
//texture texture2D sc_SSAOTexture 0:15:0:26
//texture texture2D sc_ScreenTexture 0:16:0:27
//texture texture2D sc_ShadowTexture 0:17:0:28
//ubo float sc_BonesUBO 0:0:96 {
//sc_Bone_t sc_Bones 0:[1]:96
//float4 sc_Bones.boneMatrix 0:[3]:16
//float4 sc_Bones.normalMatrix 48:[3]:16
//}
//ubo int UserUniforms 0:30:4656 {
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
//float4 weights0 3616
//float4 weights1 3632
//float4 sc_StereoClipPlanes 3664:[2]:16
//float2 sc_TAAJitterOffset 3704
//int sc_RayTracingReceiverEffectsMask 3824
//float3 sc_RayTracingOriginScale 3984
//uint sc_RayTracingReceiverMask 4000
//float3 sc_RayTracingOriginOffset 4032
//uint sc_RayTracingReceiverId 4048
//float4 voxelization_params_0 4064
//float4 voxelization_params_frustum_lrbt 4080
//float4 voxelization_params_frustum_nf 4096
//float3 voxelization_params_camera_pos 4112
//float4x4 sc_ModelMatrixVoxelization 4128
//float correctedIntensity 4192
//float3x3 intensityTextureTransform 4256
//float4 intensityTextureUvMinMax 4304
//float4 intensityTextureBorderColor 4320
//int PreviewEnabled 4484
//float alphaTestThreshold 4492
//float4 baseColor 4496
//float Port_Value_N044 4512
//float Port_Multiplier_N086 4516
//float Port_Value_N073 4520
//float Port_Scale_N083 4524
//float Port_RangeMinB_N085 4528
//float Port_RangeMaxB_N085 4532
//float Port_Input1_N045 4536
//float Port_Input1_N046 4540
//float2 Port_Input1_N041 4544
//float2 Port_Input1_N099 4552
//float Port_Value2_N100 4560
//float Port_Opacity_N000 4564
//float3 Port_Emissive_N000 4576
//float Port_Value_N001 4592
//float Port_Value_N002 4596
//float3 Port_AO_N000 4608
//float3 Port_SpecularAO_N000 4624
//float Port_Input1_N105 4640
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
//spec_const bool sc_IsEditor 56 0
//spec_const bool sc_LightEstimation 57 0
//spec_const bool sc_MotionVectorsPass 58 0
//spec_const bool sc_OITCompositingPass 59 0
//spec_const bool sc_OITDepthBoundsPass 60 0
//spec_const bool sc_OITDepthGatherPass 61 0
//spec_const bool sc_OutputBounds 62 0
//spec_const bool sc_ProjectiveShadowsCaster 63 0
//spec_const bool sc_ProjectiveShadowsReceiver 64 0
//spec_const bool sc_RayTracingGlobalIlluminationHasSwappedViews 65 0
//spec_const bool sc_RayTracingReflectionsHasSwappedViews 66 0
//spec_const bool sc_RayTracingShadowsHasSwappedViews 67 0
//spec_const bool sc_RenderAlphaToColor 68 0
//spec_const bool sc_SSAOEnabled 69 0
//spec_const bool sc_ScreenTextureHasSwappedViews 70 0
//spec_const bool sc_TAAEnabled 71 0
//spec_const bool sc_VertexBlendingUseNormals 72 0
//spec_const bool sc_VertexBlending 73 0
//spec_const bool sc_Voxelization 74 0
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
//spec_const int sc_PointLightsCount 93 0
//spec_const int sc_RayTracingGlobalIlluminationLayout 94 0
//spec_const int sc_RayTracingReflectionsLayout 95 0
//spec_const int sc_RayTracingShadowsLayout 96 0
//spec_const int sc_RenderingSpace 97 -1
//spec_const int sc_ScreenTextureLayout 98 0
//spec_const int sc_ShaderCacheConstant 99 0
//spec_const int sc_SkinBonesCount 100 0
//spec_const int sc_StereoRenderingMode 101 0
//spec_const int sc_StereoRendering_IsClipDistanceEnabled 102 0
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
constant bool sc_IsEditor [[function_constant(56)]];
constant bool sc_IsEditor_tmp = is_function_constant_defined(sc_IsEditor) ? sc_IsEditor : false;
constant bool sc_LightEstimation [[function_constant(57)]];
constant bool sc_LightEstimation_tmp = is_function_constant_defined(sc_LightEstimation) ? sc_LightEstimation : false;
constant bool sc_MotionVectorsPass [[function_constant(58)]];
constant bool sc_MotionVectorsPass_tmp = is_function_constant_defined(sc_MotionVectorsPass) ? sc_MotionVectorsPass : false;
constant bool sc_OITCompositingPass [[function_constant(59)]];
constant bool sc_OITCompositingPass_tmp = is_function_constant_defined(sc_OITCompositingPass) ? sc_OITCompositingPass : false;
constant bool sc_OITDepthBoundsPass [[function_constant(60)]];
constant bool sc_OITDepthBoundsPass_tmp = is_function_constant_defined(sc_OITDepthBoundsPass) ? sc_OITDepthBoundsPass : false;
constant bool sc_OITDepthGatherPass [[function_constant(61)]];
constant bool sc_OITDepthGatherPass_tmp = is_function_constant_defined(sc_OITDepthGatherPass) ? sc_OITDepthGatherPass : false;
constant bool sc_OutputBounds [[function_constant(62)]];
constant bool sc_OutputBounds_tmp = is_function_constant_defined(sc_OutputBounds) ? sc_OutputBounds : false;
constant bool sc_ProjectiveShadowsCaster [[function_constant(63)]];
constant bool sc_ProjectiveShadowsCaster_tmp = is_function_constant_defined(sc_ProjectiveShadowsCaster) ? sc_ProjectiveShadowsCaster : false;
constant bool sc_ProjectiveShadowsReceiver [[function_constant(64)]];
constant bool sc_ProjectiveShadowsReceiver_tmp = is_function_constant_defined(sc_ProjectiveShadowsReceiver) ? sc_ProjectiveShadowsReceiver : false;
constant bool sc_RayTracingGlobalIlluminationHasSwappedViews [[function_constant(65)]];
constant bool sc_RayTracingGlobalIlluminationHasSwappedViews_tmp = is_function_constant_defined(sc_RayTracingGlobalIlluminationHasSwappedViews) ? sc_RayTracingGlobalIlluminationHasSwappedViews : false;
constant bool sc_RayTracingReflectionsHasSwappedViews [[function_constant(66)]];
constant bool sc_RayTracingReflectionsHasSwappedViews_tmp = is_function_constant_defined(sc_RayTracingReflectionsHasSwappedViews) ? sc_RayTracingReflectionsHasSwappedViews : false;
constant bool sc_RayTracingShadowsHasSwappedViews [[function_constant(67)]];
constant bool sc_RayTracingShadowsHasSwappedViews_tmp = is_function_constant_defined(sc_RayTracingShadowsHasSwappedViews) ? sc_RayTracingShadowsHasSwappedViews : false;
constant bool sc_RenderAlphaToColor [[function_constant(68)]];
constant bool sc_RenderAlphaToColor_tmp = is_function_constant_defined(sc_RenderAlphaToColor) ? sc_RenderAlphaToColor : false;
constant bool sc_SSAOEnabled [[function_constant(69)]];
constant bool sc_SSAOEnabled_tmp = is_function_constant_defined(sc_SSAOEnabled) ? sc_SSAOEnabled : false;
constant bool sc_ScreenTextureHasSwappedViews [[function_constant(70)]];
constant bool sc_ScreenTextureHasSwappedViews_tmp = is_function_constant_defined(sc_ScreenTextureHasSwappedViews) ? sc_ScreenTextureHasSwappedViews : false;
constant bool sc_TAAEnabled [[function_constant(71)]];
constant bool sc_TAAEnabled_tmp = is_function_constant_defined(sc_TAAEnabled) ? sc_TAAEnabled : false;
constant bool sc_VertexBlendingUseNormals [[function_constant(72)]];
constant bool sc_VertexBlendingUseNormals_tmp = is_function_constant_defined(sc_VertexBlendingUseNormals) ? sc_VertexBlendingUseNormals : false;
constant bool sc_VertexBlending [[function_constant(73)]];
constant bool sc_VertexBlending_tmp = is_function_constant_defined(sc_VertexBlending) ? sc_VertexBlending : false;
constant bool sc_Voxelization [[function_constant(74)]];
constant bool sc_Voxelization_tmp = is_function_constant_defined(sc_Voxelization) ? sc_Voxelization : false;
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
constant int sc_PointLightsCount [[function_constant(93)]];
constant int sc_PointLightsCount_tmp = is_function_constant_defined(sc_PointLightsCount) ? sc_PointLightsCount : 0;
constant int sc_RayTracingGlobalIlluminationLayout [[function_constant(94)]];
constant int sc_RayTracingGlobalIlluminationLayout_tmp = is_function_constant_defined(sc_RayTracingGlobalIlluminationLayout) ? sc_RayTracingGlobalIlluminationLayout : 0;
constant int sc_RayTracingReflectionsLayout [[function_constant(95)]];
constant int sc_RayTracingReflectionsLayout_tmp = is_function_constant_defined(sc_RayTracingReflectionsLayout) ? sc_RayTracingReflectionsLayout : 0;
constant int sc_RayTracingShadowsLayout [[function_constant(96)]];
constant int sc_RayTracingShadowsLayout_tmp = is_function_constant_defined(sc_RayTracingShadowsLayout) ? sc_RayTracingShadowsLayout : 0;
constant int sc_RenderingSpace [[function_constant(97)]];
constant int sc_RenderingSpace_tmp = is_function_constant_defined(sc_RenderingSpace) ? sc_RenderingSpace : -1;
constant int sc_ScreenTextureLayout [[function_constant(98)]];
constant int sc_ScreenTextureLayout_tmp = is_function_constant_defined(sc_ScreenTextureLayout) ? sc_ScreenTextureLayout : 0;
constant int sc_ShaderCacheConstant [[function_constant(99)]];
constant int sc_ShaderCacheConstant_tmp = is_function_constant_defined(sc_ShaderCacheConstant) ? sc_ShaderCacheConstant : 0;
constant int sc_SkinBonesCount [[function_constant(100)]];
constant int sc_SkinBonesCount_tmp = is_function_constant_defined(sc_SkinBonesCount) ? sc_SkinBonesCount : 0;
constant int sc_StereoRenderingMode [[function_constant(101)]];
constant int sc_StereoRenderingMode_tmp = is_function_constant_defined(sc_StereoRenderingMode) ? sc_StereoRenderingMode : 0;
constant int sc_StereoRendering_IsClipDistanceEnabled [[function_constant(102)]];
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
float shaderComplexityValue;
float4 weights0;
float4 weights1;
float4 weights2;
float4 sc_StereoClipPlanes[2];
int sc_FallbackInstanceID;
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
int sc_RayTracingReceiverEffectsMask;
float4 sc_RayTracingReflectionsSize;
float4 sc_RayTracingReflectionsDims;
float4 sc_RayTracingReflectionsView;
float4 sc_RayTracingGlobalIlluminationSize;
float4 sc_RayTracingGlobalIlluminationDims;
float4 sc_RayTracingGlobalIlluminationView;
float4 sc_RayTracingShadowsSize;
float4 sc_RayTracingShadowsDims;
float4 sc_RayTracingShadowsView;
float3 sc_RayTracingOriginScale;
uint sc_RayTracingReceiverMask;
float3 sc_RayTracingOriginScaleInv;
float3 sc_RayTracingOriginOffset;
uint sc_RayTracingReceiverId;
float4 voxelization_params_0;
float4 voxelization_params_frustum_lrbt;
float4 voxelization_params_frustum_nf;
float3 voxelization_params_camera_pos;
float4x4 sc_ModelMatrixVoxelization;
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
texture2d<float> sc_RayTracingGlobalIllumination [[id(12)]];
texture2d<float> sc_RayTracingReflections [[id(13)]];
texture2d<float> sc_RayTracingShadows [[id(14)]];
texture2d<float> sc_SSAOTexture [[id(15)]];
texture2d<float> sc_ScreenTexture [[id(16)]];
texture2d<float> sc_ShadowTexture [[id(17)]];
sampler intensityTextureSmpSC [[id(19)]];
sampler sc_EnvmapDiffuseSmpSC [[id(20)]];
sampler sc_EnvmapSpecularSmpSC [[id(21)]];
sampler sc_RayTracingGlobalIlluminationSmpSC [[id(23)]];
sampler sc_RayTracingReflectionsSmpSC [[id(24)]];
sampler sc_RayTracingShadowsSmpSC [[id(25)]];
sampler sc_SSAOTextureSmpSC [[id(26)]];
sampler sc_ScreenTextureSmpSC [[id(27)]];
sampler sc_ShadowTextureSmpSC [[id(28)]];
constant userUniformsObj* UserUniforms [[id(30)]];
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
if ((int(sc_Voxelization_tmp)!=0))
{
sc_Vertex_t l9_2=param;
param=l9_2;
}
sc_Vertex_t l9_3=param;
if ((int(sc_VertexBlending_tmp)!=0))
{
if ((int(sc_VertexBlendingUseNormals_tmp)!=0))
{
sc_Vertex_t l9_4=l9_3;
float3 l9_5=in.blendShape0Pos;
float3 l9_6=in.blendShape0Normal;
float l9_7=(*sc_set0.UserUniforms).weights0.x;
sc_Vertex_t l9_8=l9_4;
float3 l9_9=l9_5;
float l9_10=l9_7;
float3 l9_11=l9_8.position.xyz+(l9_9*l9_10);
l9_8.position=float4(l9_11.x,l9_11.y,l9_11.z,l9_8.position.w);
l9_4=l9_8;
l9_4.normal+=(l9_6*l9_7);
l9_3=l9_4;
sc_Vertex_t l9_12=l9_3;
float3 l9_13=in.blendShape1Pos;
float3 l9_14=in.blendShape1Normal;
float l9_15=(*sc_set0.UserUniforms).weights0.y;
sc_Vertex_t l9_16=l9_12;
float3 l9_17=l9_13;
float l9_18=l9_15;
float3 l9_19=l9_16.position.xyz+(l9_17*l9_18);
l9_16.position=float4(l9_19.x,l9_19.y,l9_19.z,l9_16.position.w);
l9_12=l9_16;
l9_12.normal+=(l9_14*l9_15);
l9_3=l9_12;
sc_Vertex_t l9_20=l9_3;
float3 l9_21=in.blendShape2Pos;
float3 l9_22=in.blendShape2Normal;
float l9_23=(*sc_set0.UserUniforms).weights0.z;
sc_Vertex_t l9_24=l9_20;
float3 l9_25=l9_21;
float l9_26=l9_23;
float3 l9_27=l9_24.position.xyz+(l9_25*l9_26);
l9_24.position=float4(l9_27.x,l9_27.y,l9_27.z,l9_24.position.w);
l9_20=l9_24;
l9_20.normal+=(l9_22*l9_23);
l9_3=l9_20;
}
else
{
sc_Vertex_t l9_28=l9_3;
float3 l9_29=in.blendShape0Pos;
float l9_30=(*sc_set0.UserUniforms).weights0.x;
float3 l9_31=l9_28.position.xyz+(l9_29*l9_30);
l9_28.position=float4(l9_31.x,l9_31.y,l9_31.z,l9_28.position.w);
l9_3=l9_28;
sc_Vertex_t l9_32=l9_3;
float3 l9_33=in.blendShape1Pos;
float l9_34=(*sc_set0.UserUniforms).weights0.y;
float3 l9_35=l9_32.position.xyz+(l9_33*l9_34);
l9_32.position=float4(l9_35.x,l9_35.y,l9_35.z,l9_32.position.w);
l9_3=l9_32;
sc_Vertex_t l9_36=l9_3;
float3 l9_37=in.blendShape2Pos;
float l9_38=(*sc_set0.UserUniforms).weights0.z;
float3 l9_39=l9_36.position.xyz+(l9_37*l9_38);
l9_36.position=float4(l9_39.x,l9_39.y,l9_39.z,l9_36.position.w);
l9_3=l9_36;
sc_Vertex_t l9_40=l9_3;
float3 l9_41=in.blendShape3Pos;
float l9_42=(*sc_set0.UserUniforms).weights0.w;
float3 l9_43=l9_40.position.xyz+(l9_41*l9_42);
l9_40.position=float4(l9_43.x,l9_43.y,l9_43.z,l9_40.position.w);
l9_3=l9_40;
sc_Vertex_t l9_44=l9_3;
float3 l9_45=in.blendShape4Pos;
float l9_46=(*sc_set0.UserUniforms).weights1.x;
float3 l9_47=l9_44.position.xyz+(l9_45*l9_46);
l9_44.position=float4(l9_47.x,l9_47.y,l9_47.z,l9_44.position.w);
l9_3=l9_44;
sc_Vertex_t l9_48=l9_3;
float3 l9_49=in.blendShape5Pos;
float l9_50=(*sc_set0.UserUniforms).weights1.y;
float3 l9_51=l9_48.position.xyz+(l9_49*l9_50);
l9_48.position=float4(l9_51.x,l9_51.y,l9_51.z,l9_48.position.w);
l9_3=l9_48;
}
}
param=l9_3;
sc_Vertex_t l9_52=param;
if (sc_SkinBonesCount_tmp>0)
{
float4 l9_53=float4(0.0);
if (sc_SkinBonesCount_tmp>0)
{
l9_53=float4(1.0,fract(in.boneData.yzw));
l9_53.x-=dot(l9_53.yzw,float3(1.0));
}
float4 l9_54=l9_53;
float4 l9_55=l9_54;
int l9_56=int(in.boneData.x);
int l9_57=int(in.boneData.y);
int l9_58=int(in.boneData.z);
int l9_59=int(in.boneData.w);
int l9_60=l9_56;
float4 l9_61=l9_52.position;
float3 l9_62=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_63=l9_60;
float4 l9_64=(*sc_set0.sc_BonesUBO).sc_Bones[l9_63].boneMatrix[0];
float4 l9_65=(*sc_set0.sc_BonesUBO).sc_Bones[l9_63].boneMatrix[1];
float4 l9_66=(*sc_set0.sc_BonesUBO).sc_Bones[l9_63].boneMatrix[2];
float4 l9_67[3];
l9_67[0]=l9_64;
l9_67[1]=l9_65;
l9_67[2]=l9_66;
l9_62=float3(dot(l9_61,l9_67[0]),dot(l9_61,l9_67[1]),dot(l9_61,l9_67[2]));
}
else
{
l9_62=l9_61.xyz;
}
float3 l9_68=l9_62;
float3 l9_69=l9_68;
float l9_70=l9_55.x;
int l9_71=l9_57;
float4 l9_72=l9_52.position;
float3 l9_73=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_74=l9_71;
float4 l9_75=(*sc_set0.sc_BonesUBO).sc_Bones[l9_74].boneMatrix[0];
float4 l9_76=(*sc_set0.sc_BonesUBO).sc_Bones[l9_74].boneMatrix[1];
float4 l9_77=(*sc_set0.sc_BonesUBO).sc_Bones[l9_74].boneMatrix[2];
float4 l9_78[3];
l9_78[0]=l9_75;
l9_78[1]=l9_76;
l9_78[2]=l9_77;
l9_73=float3(dot(l9_72,l9_78[0]),dot(l9_72,l9_78[1]),dot(l9_72,l9_78[2]));
}
else
{
l9_73=l9_72.xyz;
}
float3 l9_79=l9_73;
float3 l9_80=l9_79;
float l9_81=l9_55.y;
int l9_82=l9_58;
float4 l9_83=l9_52.position;
float3 l9_84=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_85=l9_82;
float4 l9_86=(*sc_set0.sc_BonesUBO).sc_Bones[l9_85].boneMatrix[0];
float4 l9_87=(*sc_set0.sc_BonesUBO).sc_Bones[l9_85].boneMatrix[1];
float4 l9_88=(*sc_set0.sc_BonesUBO).sc_Bones[l9_85].boneMatrix[2];
float4 l9_89[3];
l9_89[0]=l9_86;
l9_89[1]=l9_87;
l9_89[2]=l9_88;
l9_84=float3(dot(l9_83,l9_89[0]),dot(l9_83,l9_89[1]),dot(l9_83,l9_89[2]));
}
else
{
l9_84=l9_83.xyz;
}
float3 l9_90=l9_84;
float3 l9_91=l9_90;
float l9_92=l9_55.z;
int l9_93=l9_59;
float4 l9_94=l9_52.position;
float3 l9_95=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_96=l9_93;
float4 l9_97=(*sc_set0.sc_BonesUBO).sc_Bones[l9_96].boneMatrix[0];
float4 l9_98=(*sc_set0.sc_BonesUBO).sc_Bones[l9_96].boneMatrix[1];
float4 l9_99=(*sc_set0.sc_BonesUBO).sc_Bones[l9_96].boneMatrix[2];
float4 l9_100[3];
l9_100[0]=l9_97;
l9_100[1]=l9_98;
l9_100[2]=l9_99;
l9_95=float3(dot(l9_94,l9_100[0]),dot(l9_94,l9_100[1]),dot(l9_94,l9_100[2]));
}
else
{
l9_95=l9_94.xyz;
}
float3 l9_101=l9_95;
float3 l9_102=(((l9_69*l9_70)+(l9_80*l9_81))+(l9_91*l9_92))+(l9_101*l9_55.w);
l9_52.position=float4(l9_102.x,l9_102.y,l9_102.z,l9_52.position.w);
int l9_103=l9_56;
float3x3 l9_104=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_103].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_103].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_103].normalMatrix[2].xyz));
float3x3 l9_105=l9_104;
float3x3 l9_106=l9_105;
int l9_107=l9_57;
float3x3 l9_108=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_107].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_107].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_107].normalMatrix[2].xyz));
float3x3 l9_109=l9_108;
float3x3 l9_110=l9_109;
int l9_111=l9_58;
float3x3 l9_112=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_111].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_111].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_111].normalMatrix[2].xyz));
float3x3 l9_113=l9_112;
float3x3 l9_114=l9_113;
int l9_115=l9_59;
float3x3 l9_116=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_115].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_115].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_115].normalMatrix[2].xyz));
float3x3 l9_117=l9_116;
float3x3 l9_118=l9_117;
l9_52.normal=((((l9_106*l9_52.normal)*l9_55.x)+((l9_110*l9_52.normal)*l9_55.y))+((l9_114*l9_52.normal)*l9_55.z))+((l9_118*l9_52.normal)*l9_55.w);
l9_52.tangent=((((l9_106*l9_52.tangent)*l9_55.x)+((l9_110*l9_52.tangent)*l9_55.y))+((l9_114*l9_52.tangent)*l9_55.z))+((l9_118*l9_52.tangent)*l9_55.w);
}
param=l9_52;
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
float3 l9_119=(*sc_set0.UserUniforms).sc_NormalMatrix*param.tangent;
out.varTangent=float4(l9_119.x,l9_119.y,l9_119.z,out.varTangent.w);
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
int l9_120=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_120=0;
}
else
{
l9_120=gl_InstanceIndex%2;
}
int l9_121=l9_120;
Camera_Up_N75=normalize((*sc_set0.UserUniforms).sc_ViewMatrixInverseArray[l9_121][1].xyz);
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
float l9_122;
if (param_15>param_14)
{
l9_122=fast::clamp(param_11,param_14,param_15);
}
else
{
l9_122=fast::clamp(param_11,param_15,param_14);
}
param_11=l9_122;
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
int l9_123=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_123=0;
}
else
{
l9_123=gl_InstanceIndex%2;
}
int l9_124=l9_123;
Camera_Right_N74=normalize((*sc_set0.UserUniforms).sc_ViewMatrixInverseArray[l9_124][0].xyz);
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
float l9_125=dot(param_16,param_16);
float l9_126;
if (l9_125>0.0)
{
l9_126=1.0/sqrt(l9_125);
}
else
{
l9_126=0.0;
}
float l9_127=l9_126;
float3 param_17=param_16*l9_127;
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
float3 l9_128=normalize(param_21);
out.varTangent=float4(l9_128.x,l9_128.y,l9_128.z,out.varTangent.w);
out.varTangent.w=in.tangent.w;
if ((int(UseViewSpaceDepthVariant_tmp)!=0)&&(((int(sc_OITDepthGatherPass_tmp)!=0)||(int(sc_OITCompositingPass_tmp)!=0))||(int(sc_OITDepthBoundsPass_tmp)!=0)))
{
float4 l9_129=param_18.position;
float4 l9_130=float4(0.0);
if (sc_RenderingSpace_tmp==3)
{
int l9_131=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_131=0;
}
else
{
l9_131=gl_InstanceIndex%2;
}
int l9_132=l9_131;
l9_130=(*sc_set0.UserUniforms).sc_ProjectionMatrixInverseArray[l9_132]*l9_129;
}
else
{
if (sc_RenderingSpace_tmp==2)
{
int l9_133=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_133=0;
}
else
{
l9_133=gl_InstanceIndex%2;
}
int l9_134=l9_133;
l9_130=(*sc_set0.UserUniforms).sc_ViewMatrixArray[l9_134]*l9_129;
}
else
{
if (sc_RenderingSpace_tmp==1)
{
int l9_135=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_135=0;
}
else
{
l9_135=gl_InstanceIndex%2;
}
int l9_136=l9_135;
l9_130=(*sc_set0.UserUniforms).sc_ModelViewMatrixArray[l9_136]*l9_129;
}
else
{
l9_130=l9_129;
}
}
}
float4 l9_137=l9_130;
out.varViewSpaceDepth=-l9_137.z;
}
float4 l9_138=float4(0.0);
if (sc_RenderingSpace_tmp==3)
{
l9_138=param_22;
}
else
{
if (sc_RenderingSpace_tmp==4)
{
int l9_139=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_139=0;
}
else
{
l9_139=gl_InstanceIndex%2;
}
int l9_140=l9_139;
l9_138=((*sc_set0.UserUniforms).sc_ModelViewMatrixArray[l9_140]*param_18.position)*float4(1.0/(*sc_set0.UserUniforms).sc_Camera.aspect,1.0,1.0,1.0);
}
else
{
if (sc_RenderingSpace_tmp==2)
{
int l9_141=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_141=0;
}
else
{
l9_141=gl_InstanceIndex%2;
}
int l9_142=l9_141;
l9_138=(*sc_set0.UserUniforms).sc_ViewProjectionMatrixArray[l9_142]*float4(out.varPos,1.0);
}
else
{
if (sc_RenderingSpace_tmp==1)
{
int l9_143=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_143=0;
}
else
{
l9_143=gl_InstanceIndex%2;
}
int l9_144=l9_143;
l9_138=(*sc_set0.UserUniforms).sc_ViewProjectionMatrixArray[l9_144]*float4(out.varPos,1.0);
}
}
}
}
out.varPackedTex=float4(param_18.texture0,param_18.texture1);
if ((int(sc_ProjectiveShadowsReceiver_tmp)!=0))
{
float4 l9_145=param_18.position;
float4 l9_146=l9_145;
if (sc_RenderingSpace_tmp==1)
{
l9_146=(*sc_set0.UserUniforms).sc_ModelMatrix*l9_145;
}
float4 l9_147=(*sc_set0.UserUniforms).sc_ProjectorMatrix*l9_146;
float2 l9_148=((l9_147.xy/float2(l9_147.w))*0.5)+float2(0.5);
out.varShadowTex=l9_148;
}
float4 l9_149=l9_138;
if (sc_DepthBufferMode_tmp==1)
{
int l9_150=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_150=0;
}
else
{
l9_150=gl_InstanceIndex%2;
}
int l9_151=l9_150;
if ((*sc_set0.UserUniforms).sc_ProjectionMatrixArray[l9_151][2].w!=0.0)
{
float l9_152=2.0/log2((*sc_set0.UserUniforms).sc_Camera.clipPlanes.y+1.0);
l9_149.z=((log2(fast::max((*sc_set0.UserUniforms).sc_Camera.clipPlanes.x,1.0+l9_149.w))*l9_152)-1.0)*l9_149.w;
}
}
float4 l9_153=l9_149;
l9_138=l9_153;
float4 l9_154=l9_138;
if ((int(sc_TAAEnabled_tmp)!=0))
{
float2 l9_155=l9_154.xy+((*sc_set0.UserUniforms).sc_TAAJitterOffset*l9_154.w);
l9_154=float4(l9_155.x,l9_155.y,l9_154.z,l9_154.w);
}
float4 l9_156=l9_154;
l9_138=l9_156;
float4 l9_157=l9_138;
if (sc_ShaderCacheConstant_tmp!=0)
{
l9_157.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
if (sc_StereoRenderingMode_tmp>0)
{
out.varStereoViewID=gl_InstanceIndex%2;
}
float4 l9_158=l9_157;
if (sc_StereoRenderingMode_tmp==1)
{
float l9_159=dot(l9_158,(*sc_set0.UserUniforms).sc_StereoClipPlanes[gl_InstanceIndex%2]);
float l9_160=l9_159;
if (sc_StereoRendering_IsClipDistanceEnabled_tmp==1)
{
}
else
{
out.varClipDistance=l9_160;
}
}
float4 l9_161=float4(l9_157.x,-l9_157.y,(l9_157.z*0.5)+(l9_157.w*0.5),l9_157.w);
out.gl_Position=l9_161;
if ((int(sc_Voxelization_tmp)!=0))
{
sc_Vertex_t l9_163=param_18;
sc_Vertex_t l9_164=l9_163;
if ((int(sc_VertexBlending_tmp)!=0))
{
if ((int(sc_VertexBlendingUseNormals_tmp)!=0))
{
sc_Vertex_t l9_165=l9_164;
float3 l9_166=in.blendShape0Pos;
float3 l9_167=in.blendShape0Normal;
float l9_168=(*sc_set0.UserUniforms).weights0.x;
sc_Vertex_t l9_169=l9_165;
float3 l9_170=l9_166;
float l9_171=l9_168;
float3 l9_172=l9_169.position.xyz+(l9_170*l9_171);
l9_169.position=float4(l9_172.x,l9_172.y,l9_172.z,l9_169.position.w);
l9_165=l9_169;
l9_165.normal+=(l9_167*l9_168);
l9_164=l9_165;
sc_Vertex_t l9_173=l9_164;
float3 l9_174=in.blendShape1Pos;
float3 l9_175=in.blendShape1Normal;
float l9_176=(*sc_set0.UserUniforms).weights0.y;
sc_Vertex_t l9_177=l9_173;
float3 l9_178=l9_174;
float l9_179=l9_176;
float3 l9_180=l9_177.position.xyz+(l9_178*l9_179);
l9_177.position=float4(l9_180.x,l9_180.y,l9_180.z,l9_177.position.w);
l9_173=l9_177;
l9_173.normal+=(l9_175*l9_176);
l9_164=l9_173;
sc_Vertex_t l9_181=l9_164;
float3 l9_182=in.blendShape2Pos;
float3 l9_183=in.blendShape2Normal;
float l9_184=(*sc_set0.UserUniforms).weights0.z;
sc_Vertex_t l9_185=l9_181;
float3 l9_186=l9_182;
float l9_187=l9_184;
float3 l9_188=l9_185.position.xyz+(l9_186*l9_187);
l9_185.position=float4(l9_188.x,l9_188.y,l9_188.z,l9_185.position.w);
l9_181=l9_185;
l9_181.normal+=(l9_183*l9_184);
l9_164=l9_181;
}
else
{
sc_Vertex_t l9_189=l9_164;
float3 l9_190=in.blendShape0Pos;
float l9_191=(*sc_set0.UserUniforms).weights0.x;
float3 l9_192=l9_189.position.xyz+(l9_190*l9_191);
l9_189.position=float4(l9_192.x,l9_192.y,l9_192.z,l9_189.position.w);
l9_164=l9_189;
sc_Vertex_t l9_193=l9_164;
float3 l9_194=in.blendShape1Pos;
float l9_195=(*sc_set0.UserUniforms).weights0.y;
float3 l9_196=l9_193.position.xyz+(l9_194*l9_195);
l9_193.position=float4(l9_196.x,l9_196.y,l9_196.z,l9_193.position.w);
l9_164=l9_193;
sc_Vertex_t l9_197=l9_164;
float3 l9_198=in.blendShape2Pos;
float l9_199=(*sc_set0.UserUniforms).weights0.z;
float3 l9_200=l9_197.position.xyz+(l9_198*l9_199);
l9_197.position=float4(l9_200.x,l9_200.y,l9_200.z,l9_197.position.w);
l9_164=l9_197;
sc_Vertex_t l9_201=l9_164;
float3 l9_202=in.blendShape3Pos;
float l9_203=(*sc_set0.UserUniforms).weights0.w;
float3 l9_204=l9_201.position.xyz+(l9_202*l9_203);
l9_201.position=float4(l9_204.x,l9_204.y,l9_204.z,l9_201.position.w);
l9_164=l9_201;
sc_Vertex_t l9_205=l9_164;
float3 l9_206=in.blendShape4Pos;
float l9_207=(*sc_set0.UserUniforms).weights1.x;
float3 l9_208=l9_205.position.xyz+(l9_206*l9_207);
l9_205.position=float4(l9_208.x,l9_208.y,l9_208.z,l9_205.position.w);
l9_164=l9_205;
sc_Vertex_t l9_209=l9_164;
float3 l9_210=in.blendShape5Pos;
float l9_211=(*sc_set0.UserUniforms).weights1.y;
float3 l9_212=l9_209.position.xyz+(l9_210*l9_211);
l9_209.position=float4(l9_212.x,l9_212.y,l9_212.z,l9_209.position.w);
l9_164=l9_209;
}
}
l9_163=l9_164;
sc_Vertex_t l9_213=l9_163;
if (sc_SkinBonesCount_tmp>0)
{
float4 l9_214=float4(0.0);
if (sc_SkinBonesCount_tmp>0)
{
l9_214=float4(1.0,fract(in.boneData.yzw));
l9_214.x-=dot(l9_214.yzw,float3(1.0));
}
float4 l9_215=l9_214;
float4 l9_216=l9_215;
int l9_217=int(in.boneData.x);
int l9_218=int(in.boneData.y);
int l9_219=int(in.boneData.z);
int l9_220=int(in.boneData.w);
int l9_221=l9_217;
float4 l9_222=l9_213.position;
float3 l9_223=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_224=l9_221;
float4 l9_225=(*sc_set0.sc_BonesUBO).sc_Bones[l9_224].boneMatrix[0];
float4 l9_226=(*sc_set0.sc_BonesUBO).sc_Bones[l9_224].boneMatrix[1];
float4 l9_227=(*sc_set0.sc_BonesUBO).sc_Bones[l9_224].boneMatrix[2];
float4 l9_228[3];
l9_228[0]=l9_225;
l9_228[1]=l9_226;
l9_228[2]=l9_227;
l9_223=float3(dot(l9_222,l9_228[0]),dot(l9_222,l9_228[1]),dot(l9_222,l9_228[2]));
}
else
{
l9_223=l9_222.xyz;
}
float3 l9_229=l9_223;
float3 l9_230=l9_229;
float l9_231=l9_216.x;
int l9_232=l9_218;
float4 l9_233=l9_213.position;
float3 l9_234=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_235=l9_232;
float4 l9_236=(*sc_set0.sc_BonesUBO).sc_Bones[l9_235].boneMatrix[0];
float4 l9_237=(*sc_set0.sc_BonesUBO).sc_Bones[l9_235].boneMatrix[1];
float4 l9_238=(*sc_set0.sc_BonesUBO).sc_Bones[l9_235].boneMatrix[2];
float4 l9_239[3];
l9_239[0]=l9_236;
l9_239[1]=l9_237;
l9_239[2]=l9_238;
l9_234=float3(dot(l9_233,l9_239[0]),dot(l9_233,l9_239[1]),dot(l9_233,l9_239[2]));
}
else
{
l9_234=l9_233.xyz;
}
float3 l9_240=l9_234;
float3 l9_241=l9_240;
float l9_242=l9_216.y;
int l9_243=l9_219;
float4 l9_244=l9_213.position;
float3 l9_245=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_246=l9_243;
float4 l9_247=(*sc_set0.sc_BonesUBO).sc_Bones[l9_246].boneMatrix[0];
float4 l9_248=(*sc_set0.sc_BonesUBO).sc_Bones[l9_246].boneMatrix[1];
float4 l9_249=(*sc_set0.sc_BonesUBO).sc_Bones[l9_246].boneMatrix[2];
float4 l9_250[3];
l9_250[0]=l9_247;
l9_250[1]=l9_248;
l9_250[2]=l9_249;
l9_245=float3(dot(l9_244,l9_250[0]),dot(l9_244,l9_250[1]),dot(l9_244,l9_250[2]));
}
else
{
l9_245=l9_244.xyz;
}
float3 l9_251=l9_245;
float3 l9_252=l9_251;
float l9_253=l9_216.z;
int l9_254=l9_220;
float4 l9_255=l9_213.position;
float3 l9_256=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_257=l9_254;
float4 l9_258=(*sc_set0.sc_BonesUBO).sc_Bones[l9_257].boneMatrix[0];
float4 l9_259=(*sc_set0.sc_BonesUBO).sc_Bones[l9_257].boneMatrix[1];
float4 l9_260=(*sc_set0.sc_BonesUBO).sc_Bones[l9_257].boneMatrix[2];
float4 l9_261[3];
l9_261[0]=l9_258;
l9_261[1]=l9_259;
l9_261[2]=l9_260;
l9_256=float3(dot(l9_255,l9_261[0]),dot(l9_255,l9_261[1]),dot(l9_255,l9_261[2]));
}
else
{
l9_256=l9_255.xyz;
}
float3 l9_262=l9_256;
float3 l9_263=(((l9_230*l9_231)+(l9_241*l9_242))+(l9_252*l9_253))+(l9_262*l9_216.w);
l9_213.position=float4(l9_263.x,l9_263.y,l9_263.z,l9_213.position.w);
int l9_264=l9_217;
float3x3 l9_265=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_264].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_264].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_264].normalMatrix[2].xyz));
float3x3 l9_266=l9_265;
float3x3 l9_267=l9_266;
int l9_268=l9_218;
float3x3 l9_269=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_268].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_268].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_268].normalMatrix[2].xyz));
float3x3 l9_270=l9_269;
float3x3 l9_271=l9_270;
int l9_272=l9_219;
float3x3 l9_273=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_272].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_272].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_272].normalMatrix[2].xyz));
float3x3 l9_274=l9_273;
float3x3 l9_275=l9_274;
int l9_276=l9_220;
float3x3 l9_277=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_276].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_276].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_276].normalMatrix[2].xyz));
float3x3 l9_278=l9_277;
float3x3 l9_279=l9_278;
l9_213.normal=((((l9_267*l9_213.normal)*l9_216.x)+((l9_271*l9_213.normal)*l9_216.y))+((l9_275*l9_213.normal)*l9_216.z))+((l9_279*l9_213.normal)*l9_216.w);
l9_213.tangent=((((l9_267*l9_213.tangent)*l9_216.x)+((l9_271*l9_213.tangent)*l9_216.y))+((l9_275*l9_213.tangent)*l9_216.z))+((l9_279*l9_213.tangent)*l9_216.w);
}
l9_163=l9_213;
float l9_280=(*sc_set0.UserUniforms).voxelization_params_0.y;
float l9_281=(*sc_set0.UserUniforms).voxelization_params_0.z;
float l9_282=(*sc_set0.UserUniforms).voxelization_params_0.w;
float l9_283=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.x;
float l9_284=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.y;
float l9_285=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.z;
float l9_286=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.w;
float l9_287=(*sc_set0.UserUniforms).voxelization_params_frustum_nf.x;
float l9_288=(*sc_set0.UserUniforms).voxelization_params_frustum_nf.y;
float3 l9_289=(*sc_set0.UserUniforms).voxelization_params_camera_pos;
float l9_290=l9_280/l9_281;
int l9_291=gl_InstanceIndex;
int l9_292=l9_291;
l9_163.position=(*sc_set0.UserUniforms).sc_ModelMatrixVoxelization*l9_163.position;
float3 l9_293=l9_163.position.xyz;
float3 l9_294=float3(float(l9_292%int(l9_282))*l9_280,float(l9_292/int(l9_282))*l9_280,(float(l9_292)*l9_290)+l9_287);
float3 l9_295=l9_293+l9_294;
float4 l9_296=float4(l9_295-l9_289,1.0);
float l9_297=l9_283;
float l9_298=l9_284;
float l9_299=l9_285;
float l9_300=l9_286;
float l9_301=l9_287;
float l9_302=l9_288;
float4x4 l9_303=float4x4(float4(2.0/(l9_298-l9_297),0.0,0.0,(-(l9_298+l9_297))/(l9_298-l9_297)),float4(0.0,2.0/(l9_300-l9_299),0.0,(-(l9_300+l9_299))/(l9_300-l9_299)),float4(0.0,0.0,(-2.0)/(l9_302-l9_301),(-(l9_302+l9_301))/(l9_302-l9_301)),float4(0.0,0.0,0.0,1.0));
float4x4 l9_304=l9_303;
float4 l9_305=l9_304*l9_296;
l9_305.w=1.0;
out.varScreenPos=l9_305;
float4 l9_306=l9_305*1.0;
if (sc_ShaderCacheConstant_tmp!=0)
{
l9_306.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
if (sc_StereoRenderingMode_tmp>0)
{
out.varStereoViewID=gl_InstanceIndex%2;
}
float4 l9_307=l9_306;
if (sc_StereoRenderingMode_tmp==1)
{
float l9_308=dot(l9_307,(*sc_set0.UserUniforms).sc_StereoClipPlanes[gl_InstanceIndex%2]);
float l9_309=l9_308;
if (sc_StereoRendering_IsClipDistanceEnabled_tmp==1)
{
}
else
{
out.varClipDistance=l9_309;
}
}
float4 l9_310=float4(l9_306.x,-l9_306.y,(l9_306.z*0.5)+(l9_306.w*0.5),l9_306.w);
out.gl_Position=l9_310;
param_18=l9_163;
}
else
{
if ((int(sc_OutputBounds_tmp)!=0))
{
sc_Vertex_t l9_311=param_18;
sc_Vertex_t l9_312=l9_311;
if ((int(sc_VertexBlending_tmp)!=0))
{
if ((int(sc_VertexBlendingUseNormals_tmp)!=0))
{
sc_Vertex_t l9_313=l9_312;
float3 l9_314=in.blendShape0Pos;
float3 l9_315=in.blendShape0Normal;
float l9_316=(*sc_set0.UserUniforms).weights0.x;
sc_Vertex_t l9_317=l9_313;
float3 l9_318=l9_314;
float l9_319=l9_316;
float3 l9_320=l9_317.position.xyz+(l9_318*l9_319);
l9_317.position=float4(l9_320.x,l9_320.y,l9_320.z,l9_317.position.w);
l9_313=l9_317;
l9_313.normal+=(l9_315*l9_316);
l9_312=l9_313;
sc_Vertex_t l9_321=l9_312;
float3 l9_322=in.blendShape1Pos;
float3 l9_323=in.blendShape1Normal;
float l9_324=(*sc_set0.UserUniforms).weights0.y;
sc_Vertex_t l9_325=l9_321;
float3 l9_326=l9_322;
float l9_327=l9_324;
float3 l9_328=l9_325.position.xyz+(l9_326*l9_327);
l9_325.position=float4(l9_328.x,l9_328.y,l9_328.z,l9_325.position.w);
l9_321=l9_325;
l9_321.normal+=(l9_323*l9_324);
l9_312=l9_321;
sc_Vertex_t l9_329=l9_312;
float3 l9_330=in.blendShape2Pos;
float3 l9_331=in.blendShape2Normal;
float l9_332=(*sc_set0.UserUniforms).weights0.z;
sc_Vertex_t l9_333=l9_329;
float3 l9_334=l9_330;
float l9_335=l9_332;
float3 l9_336=l9_333.position.xyz+(l9_334*l9_335);
l9_333.position=float4(l9_336.x,l9_336.y,l9_336.z,l9_333.position.w);
l9_329=l9_333;
l9_329.normal+=(l9_331*l9_332);
l9_312=l9_329;
}
else
{
sc_Vertex_t l9_337=l9_312;
float3 l9_338=in.blendShape0Pos;
float l9_339=(*sc_set0.UserUniforms).weights0.x;
float3 l9_340=l9_337.position.xyz+(l9_338*l9_339);
l9_337.position=float4(l9_340.x,l9_340.y,l9_340.z,l9_337.position.w);
l9_312=l9_337;
sc_Vertex_t l9_341=l9_312;
float3 l9_342=in.blendShape1Pos;
float l9_343=(*sc_set0.UserUniforms).weights0.y;
float3 l9_344=l9_341.position.xyz+(l9_342*l9_343);
l9_341.position=float4(l9_344.x,l9_344.y,l9_344.z,l9_341.position.w);
l9_312=l9_341;
sc_Vertex_t l9_345=l9_312;
float3 l9_346=in.blendShape2Pos;
float l9_347=(*sc_set0.UserUniforms).weights0.z;
float3 l9_348=l9_345.position.xyz+(l9_346*l9_347);
l9_345.position=float4(l9_348.x,l9_348.y,l9_348.z,l9_345.position.w);
l9_312=l9_345;
sc_Vertex_t l9_349=l9_312;
float3 l9_350=in.blendShape3Pos;
float l9_351=(*sc_set0.UserUniforms).weights0.w;
float3 l9_352=l9_349.position.xyz+(l9_350*l9_351);
l9_349.position=float4(l9_352.x,l9_352.y,l9_352.z,l9_349.position.w);
l9_312=l9_349;
sc_Vertex_t l9_353=l9_312;
float3 l9_354=in.blendShape4Pos;
float l9_355=(*sc_set0.UserUniforms).weights1.x;
float3 l9_356=l9_353.position.xyz+(l9_354*l9_355);
l9_353.position=float4(l9_356.x,l9_356.y,l9_356.z,l9_353.position.w);
l9_312=l9_353;
sc_Vertex_t l9_357=l9_312;
float3 l9_358=in.blendShape5Pos;
float l9_359=(*sc_set0.UserUniforms).weights1.y;
float3 l9_360=l9_357.position.xyz+(l9_358*l9_359);
l9_357.position=float4(l9_360.x,l9_360.y,l9_360.z,l9_357.position.w);
l9_312=l9_357;
}
}
l9_311=l9_312;
sc_Vertex_t l9_361=l9_311;
if (sc_SkinBonesCount_tmp>0)
{
float4 l9_362=float4(0.0);
if (sc_SkinBonesCount_tmp>0)
{
l9_362=float4(1.0,fract(in.boneData.yzw));
l9_362.x-=dot(l9_362.yzw,float3(1.0));
}
float4 l9_363=l9_362;
float4 l9_364=l9_363;
int l9_365=int(in.boneData.x);
int l9_366=int(in.boneData.y);
int l9_367=int(in.boneData.z);
int l9_368=int(in.boneData.w);
int l9_369=l9_365;
float4 l9_370=l9_361.position;
float3 l9_371=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_372=l9_369;
float4 l9_373=(*sc_set0.sc_BonesUBO).sc_Bones[l9_372].boneMatrix[0];
float4 l9_374=(*sc_set0.sc_BonesUBO).sc_Bones[l9_372].boneMatrix[1];
float4 l9_375=(*sc_set0.sc_BonesUBO).sc_Bones[l9_372].boneMatrix[2];
float4 l9_376[3];
l9_376[0]=l9_373;
l9_376[1]=l9_374;
l9_376[2]=l9_375;
l9_371=float3(dot(l9_370,l9_376[0]),dot(l9_370,l9_376[1]),dot(l9_370,l9_376[2]));
}
else
{
l9_371=l9_370.xyz;
}
float3 l9_377=l9_371;
float3 l9_378=l9_377;
float l9_379=l9_364.x;
int l9_380=l9_366;
float4 l9_381=l9_361.position;
float3 l9_382=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_383=l9_380;
float4 l9_384=(*sc_set0.sc_BonesUBO).sc_Bones[l9_383].boneMatrix[0];
float4 l9_385=(*sc_set0.sc_BonesUBO).sc_Bones[l9_383].boneMatrix[1];
float4 l9_386=(*sc_set0.sc_BonesUBO).sc_Bones[l9_383].boneMatrix[2];
float4 l9_387[3];
l9_387[0]=l9_384;
l9_387[1]=l9_385;
l9_387[2]=l9_386;
l9_382=float3(dot(l9_381,l9_387[0]),dot(l9_381,l9_387[1]),dot(l9_381,l9_387[2]));
}
else
{
l9_382=l9_381.xyz;
}
float3 l9_388=l9_382;
float3 l9_389=l9_388;
float l9_390=l9_364.y;
int l9_391=l9_367;
float4 l9_392=l9_361.position;
float3 l9_393=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_394=l9_391;
float4 l9_395=(*sc_set0.sc_BonesUBO).sc_Bones[l9_394].boneMatrix[0];
float4 l9_396=(*sc_set0.sc_BonesUBO).sc_Bones[l9_394].boneMatrix[1];
float4 l9_397=(*sc_set0.sc_BonesUBO).sc_Bones[l9_394].boneMatrix[2];
float4 l9_398[3];
l9_398[0]=l9_395;
l9_398[1]=l9_396;
l9_398[2]=l9_397;
l9_393=float3(dot(l9_392,l9_398[0]),dot(l9_392,l9_398[1]),dot(l9_392,l9_398[2]));
}
else
{
l9_393=l9_392.xyz;
}
float3 l9_399=l9_393;
float3 l9_400=l9_399;
float l9_401=l9_364.z;
int l9_402=l9_368;
float4 l9_403=l9_361.position;
float3 l9_404=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_405=l9_402;
float4 l9_406=(*sc_set0.sc_BonesUBO).sc_Bones[l9_405].boneMatrix[0];
float4 l9_407=(*sc_set0.sc_BonesUBO).sc_Bones[l9_405].boneMatrix[1];
float4 l9_408=(*sc_set0.sc_BonesUBO).sc_Bones[l9_405].boneMatrix[2];
float4 l9_409[3];
l9_409[0]=l9_406;
l9_409[1]=l9_407;
l9_409[2]=l9_408;
l9_404=float3(dot(l9_403,l9_409[0]),dot(l9_403,l9_409[1]),dot(l9_403,l9_409[2]));
}
else
{
l9_404=l9_403.xyz;
}
float3 l9_410=l9_404;
float3 l9_411=(((l9_378*l9_379)+(l9_389*l9_390))+(l9_400*l9_401))+(l9_410*l9_364.w);
l9_361.position=float4(l9_411.x,l9_411.y,l9_411.z,l9_361.position.w);
int l9_412=l9_365;
float3x3 l9_413=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_412].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_412].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_412].normalMatrix[2].xyz));
float3x3 l9_414=l9_413;
float3x3 l9_415=l9_414;
int l9_416=l9_366;
float3x3 l9_417=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_416].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_416].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_416].normalMatrix[2].xyz));
float3x3 l9_418=l9_417;
float3x3 l9_419=l9_418;
int l9_420=l9_367;
float3x3 l9_421=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_420].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_420].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_420].normalMatrix[2].xyz));
float3x3 l9_422=l9_421;
float3x3 l9_423=l9_422;
int l9_424=l9_368;
float3x3 l9_425=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_424].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_424].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_424].normalMatrix[2].xyz));
float3x3 l9_426=l9_425;
float3x3 l9_427=l9_426;
l9_361.normal=((((l9_415*l9_361.normal)*l9_364.x)+((l9_419*l9_361.normal)*l9_364.y))+((l9_423*l9_361.normal)*l9_364.z))+((l9_427*l9_361.normal)*l9_364.w);
l9_361.tangent=((((l9_415*l9_361.tangent)*l9_364.x)+((l9_419*l9_361.tangent)*l9_364.y))+((l9_423*l9_361.tangent)*l9_364.z))+((l9_427*l9_361.tangent)*l9_364.w);
}
l9_311=l9_361;
float3 l9_428=(*sc_set0.UserUniforms).voxelization_params_camera_pos;
float2 l9_429=((l9_311.position.xy/float2(l9_311.position.w))*0.5)+float2(0.5);
out.varPackedTex=float4(l9_429.x,l9_429.y,out.varPackedTex.z,out.varPackedTex.w);
l9_311.position=(*sc_set0.UserUniforms).sc_ModelMatrixVoxelization*l9_311.position;
float3 l9_430=l9_311.position.xyz-l9_428;
l9_311.position=float4(l9_430.x,l9_430.y,l9_430.z,l9_311.position.w);
out.varPos=l9_311.position.xyz;
out.varNormal=normalize(l9_311.normal);
float l9_431=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.x;
float l9_432=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.y;
float l9_433=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.z;
float l9_434=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.w;
float l9_435=(*sc_set0.UserUniforms).voxelization_params_frustum_nf.x;
float l9_436=(*sc_set0.UserUniforms).voxelization_params_frustum_nf.y;
float l9_437=l9_431;
float l9_438=l9_432;
float l9_439=l9_433;
float l9_440=l9_434;
float l9_441=l9_435;
float l9_442=l9_436;
float4x4 l9_443=float4x4(float4(2.0/(l9_438-l9_437),0.0,0.0,(-(l9_438+l9_437))/(l9_438-l9_437)),float4(0.0,2.0/(l9_440-l9_439),0.0,(-(l9_440+l9_439))/(l9_440-l9_439)),float4(0.0,0.0,(-2.0)/(l9_442-l9_441),(-(l9_442+l9_441))/(l9_442-l9_441)),float4(0.0,0.0,0.0,1.0));
float4x4 l9_444=l9_443;
float4 l9_445=float4(0.0);
float3 l9_446=(l9_444*l9_311.position).xyz;
l9_445=float4(l9_446.x,l9_446.y,l9_446.z,l9_445.w);
l9_445.w=1.0;
out.varScreenPos=l9_445;
float4 l9_447=l9_445*1.0;
float4 l9_448=l9_447;
if (sc_ShaderCacheConstant_tmp!=0)
{
l9_448.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
if (sc_StereoRenderingMode_tmp>0)
{
out.varStereoViewID=gl_InstanceIndex%2;
}
float4 l9_449=l9_448;
if (sc_StereoRenderingMode_tmp==1)
{
float l9_450=dot(l9_449,(*sc_set0.UserUniforms).sc_StereoClipPlanes[gl_InstanceIndex%2]);
float l9_451=l9_450;
if (sc_StereoRendering_IsClipDistanceEnabled_tmp==1)
{
}
else
{
out.varClipDistance=l9_451;
}
}
float4 l9_452=float4(l9_448.x,-l9_448.y,(l9_448.z*0.5)+(l9_448.w*0.5),l9_448.w);
out.gl_Position=l9_452;
param_18=l9_311;
}
}
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
float shaderComplexityValue;
float4 weights0;
float4 weights1;
float4 weights2;
float4 sc_StereoClipPlanes[2];
int sc_FallbackInstanceID;
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
int sc_RayTracingReceiverEffectsMask;
float4 sc_RayTracingReflectionsSize;
float4 sc_RayTracingReflectionsDims;
float4 sc_RayTracingReflectionsView;
float4 sc_RayTracingGlobalIlluminationSize;
float4 sc_RayTracingGlobalIlluminationDims;
float4 sc_RayTracingGlobalIlluminationView;
float4 sc_RayTracingShadowsSize;
float4 sc_RayTracingShadowsDims;
float4 sc_RayTracingShadowsView;
float3 sc_RayTracingOriginScale;
uint sc_RayTracingReceiverMask;
float3 sc_RayTracingOriginScaleInv;
float3 sc_RayTracingOriginOffset;
uint sc_RayTracingReceiverId;
float4 voxelization_params_0;
float4 voxelization_params_frustum_lrbt;
float4 voxelization_params_frustum_nf;
float3 voxelization_params_camera_pos;
float4x4 sc_ModelMatrixVoxelization;
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
texture2d<float> sc_RayTracingGlobalIllumination [[id(12)]];
texture2d<float> sc_RayTracingReflections [[id(13)]];
texture2d<float> sc_RayTracingShadows [[id(14)]];
texture2d<float> sc_SSAOTexture [[id(15)]];
texture2d<float> sc_ScreenTexture [[id(16)]];
texture2d<float> sc_ShadowTexture [[id(17)]];
sampler intensityTextureSmpSC [[id(19)]];
sampler sc_EnvmapDiffuseSmpSC [[id(20)]];
sampler sc_EnvmapSpecularSmpSC [[id(21)]];
sampler sc_RayTracingGlobalIlluminationSmpSC [[id(23)]];
sampler sc_RayTracingReflectionsSmpSC [[id(24)]];
sampler sc_RayTracingShadowsSmpSC [[id(25)]];
sampler sc_SSAOTextureSmpSC [[id(26)]];
sampler sc_ScreenTextureSmpSC [[id(27)]];
sampler sc_ShadowTextureSmpSC [[id(28)]];
constant userUniformsObj* UserUniforms [[id(30)]];
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
float3 evaluateSSAO(thread const float3& positionWS,thread int& varStereoViewID,thread texture2d<float> sc_SSAOTexture,thread sampler sc_SSAOTextureSmpSC,constant userUniformsObj& UserUniforms)
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
int l9_228;
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
l9_236=l9_278;
float l9_279=l9_236.x;
int l9_280=l9_239.x;
bool l9_281=l9_245;
float l9_282=l9_246;
if ((l9_280==0)||(l9_280==3))
{
float l9_283=l9_279;
float l9_284=0.0;
float l9_285=1.0;
bool l9_286=l9_281;
float l9_287=l9_282;
float l9_288=fast::clamp(l9_283,l9_284,l9_285);
float l9_289=step(abs(l9_283-l9_288),9.9999997e-06);
l9_287*=(l9_289+((1.0-float(l9_286))*(1.0-l9_289)));
l9_283=l9_288;
l9_279=l9_283;
l9_282=l9_287;
}
l9_236.x=l9_279;
l9_246=l9_282;
float l9_290=l9_236.y;
int l9_291=l9_239.y;
bool l9_292=l9_245;
float l9_293=l9_246;
if ((l9_291==0)||(l9_291==3))
{
float l9_294=l9_290;
float l9_295=0.0;
float l9_296=1.0;
bool l9_297=l9_292;
float l9_298=l9_293;
float l9_299=fast::clamp(l9_294,l9_295,l9_296);
float l9_300=step(abs(l9_294-l9_299),9.9999997e-06);
l9_298*=(l9_300+((1.0-float(l9_297))*(1.0-l9_300)));
l9_294=l9_299;
l9_290=l9_294;
l9_293=l9_298;
}
l9_236.y=l9_290;
l9_246=l9_293;
float2 l9_301=l9_236;
int l9_302=l9_234;
int l9_303=l9_235;
float l9_304=l9_244;
float2 l9_305=l9_301;
int l9_306=l9_302;
int l9_307=l9_303;
float3 l9_308=float3(0.0);
if (l9_306==0)
{
l9_308=float3(l9_305,0.0);
}
else
{
if (l9_306==1)
{
l9_308=float3(l9_305.x,(l9_305.y*0.5)+(0.5-(float(l9_307)*0.5)),0.0);
}
else
{
l9_308=float3(l9_305,float(l9_307));
}
}
float3 l9_309=l9_308;
float3 l9_310=l9_309;
float4 l9_311=intensityTexture.sample(intensityTextureSmpSC,l9_310.xy,bias(l9_304));
float4 l9_312=l9_311;
if (l9_242)
{
l9_312=mix(l9_243,l9_312,float4(l9_246));
}
float4 l9_313=l9_312;
float3 l9_314=l9_313.xyz;
float3 l9_315=l9_314;
float l9_316=16.0;
float l9_317=((((l9_315.x*256.0)+l9_315.y)+(l9_315.z/256.0))/257.00391)*l9_316;
float l9_318=l9_317;
if ((int(BLEND_MODE_FORGRAY_tmp)!=0))
{
l9_318=fast::max(l9_318,1.0);
}
if ((int(BLEND_MODE_NOTBRIGHT_tmp)!=0))
{
l9_318=fast::min(l9_318,1.0);
}
float l9_319=l9_225;
float3 l9_320=param_8;
float3 l9_321=param_9;
float l9_322=l9_226;
float l9_323=l9_318;
float3 l9_324=transformColor(l9_319,l9_320,l9_321,l9_322,l9_323);
return l9_324;
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
float4 sc_OutputMotionVectorsIfNeeded(thread const float3& surfacePosWorldSpace,thread const float4& finalColor,thread int& varStereoViewID,constant userUniformsObj& UserUniforms)
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
l9_19.ao=evaluateSSAO(l9_26,in.varStereoViewID,sc_set0.sc_SSAOTexture,sc_set0.sc_SSAOTextureSmpSC,(*sc_set0.UserUniforms));
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
if (((*sc_set0.UserUniforms).sc_RayTracingReceiverEffectsMask&4)!=0)
{
float4 l9_90=gl_FragCoord;
float2 l9_91=l9_90.xy*(*sc_set0.UserUniforms).sc_CurrentRenderTargetDims.zw;
float2 l9_92=l9_91;
float2 l9_93=l9_92;
float l9_94=0.0;
int l9_95;
if ((int(sc_RayTracingShadowsHasSwappedViews_tmp)!=0))
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
float2 l9_101=l9_93;
int l9_102=sc_RayTracingShadowsLayout_tmp;
int l9_103=l9_100;
float l9_104=l9_94;
float2 l9_105=l9_101;
int l9_106=l9_102;
int l9_107=l9_103;
float3 l9_108=float3(0.0);
if (l9_106==0)
{
l9_108=float3(l9_105,0.0);
}
else
{
if (l9_106==1)
{
l9_108=float3(l9_105.x,(l9_105.y*0.5)+(0.5-(float(l9_107)*0.5)),0.0);
}
else
{
l9_108=float3(l9_105,float(l9_107));
}
}
float3 l9_109=l9_108;
float3 l9_110=l9_109;
float4 l9_111=sc_set0.sc_RayTracingShadows.sample(sc_set0.sc_RayTracingShadowsSmpSC,l9_110.xy,bias(l9_104));
float4 l9_112=l9_111;
float4 l9_113=l9_112;
float l9_114=l9_113.x;
float l9_115=1.0-l9_114;
l9_35.directDiffuse*=l9_115;
l9_35.directSpecular*=l9_115;
}
SurfaceProperties l9_116=l9_32;
float3 l9_117=l9_116.normal;
float3 l9_118=float3(0.0);
if ((sc_EnvLightMode_tmp==sc_AmbientLightMode_EnvironmentMap_tmp)||(sc_EnvLightMode_tmp==sc_AmbientLightMode_FromCamera_tmp))
{
float3 l9_119=l9_117;
float3 l9_120=l9_119;
float l9_121=(*sc_set0.UserUniforms).sc_EnvmapRotation.y;
float2 l9_122=float2(0.0);
float l9_123=l9_120.x;
float l9_124=-l9_120.z;
float l9_125=(l9_123<0.0) ? (-1.0) : 1.0;
float l9_126=l9_125*acos(fast::clamp(l9_124/length(float2(l9_123,l9_124)),-1.0,1.0));
l9_122.x=l9_126-1.5707964;
l9_122.y=acos(l9_120.y);
l9_122/=float2(6.2831855,3.1415927);
l9_122.y=1.0-l9_122.y;
l9_122.x+=(l9_121/360.0);
l9_122.x=fract((l9_122.x+floor(l9_122.x))+1.0);
float2 l9_127=l9_122;
float2 l9_128=l9_127;
float4 l9_129=float4(0.0);
if (sc_EnvLightMode_tmp==sc_AmbientLightMode_FromCamera_tmp)
{
if (SC_DEVICE_CLASS_tmp>=2)
{
float2 l9_130=l9_128;
float2 l9_131=(*sc_set0.UserUniforms).sc_EnvmapSpecularSize.xy;
float l9_132=5.0;
l9_128=calcSeamlessPanoramicUvsForSampling(l9_130,l9_131,l9_132);
}
float2 l9_133=l9_128;
float l9_134=13.0;
int l9_135;
if ((int(sc_EnvmapSpecularHasSwappedViews_tmp)!=0))
{
int l9_136=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_136=0;
}
else
{
l9_136=in.varStereoViewID;
}
int l9_137=l9_136;
l9_135=1-l9_137;
}
else
{
int l9_138=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_138=0;
}
else
{
l9_138=in.varStereoViewID;
}
int l9_139=l9_138;
l9_135=l9_139;
}
int l9_140=l9_135;
float2 l9_141=l9_133;
int l9_142=sc_EnvmapSpecularLayout_tmp;
int l9_143=l9_140;
float l9_144=l9_134;
float2 l9_145=l9_141;
int l9_146=l9_142;
int l9_147=l9_143;
float3 l9_148=float3(0.0);
if (l9_146==0)
{
l9_148=float3(l9_145,0.0);
}
else
{
if (l9_146==1)
{
l9_148=float3(l9_145.x,(l9_145.y*0.5)+(0.5-(float(l9_147)*0.5)),0.0);
}
else
{
l9_148=float3(l9_145,float(l9_147));
}
}
float3 l9_149=l9_148;
float3 l9_150=l9_149;
float4 l9_151=sc_set0.sc_EnvmapSpecular.sample(sc_set0.sc_EnvmapSpecularSmpSC,l9_150.xy,bias(l9_144));
float4 l9_152=l9_151;
l9_129=l9_152;
}
else
{
if ((int(sc_HasDiffuseEnvmap_tmp)!=0))
{
float2 l9_153=l9_128;
float2 l9_154=(*sc_set0.UserUniforms).sc_EnvmapDiffuseSize.xy;
float l9_155=0.0;
l9_128=calcSeamlessPanoramicUvsForSampling(l9_153,l9_154,l9_155);
float2 l9_156=l9_128;
float l9_157=-13.0;
int l9_158;
if ((int(sc_EnvmapDiffuseHasSwappedViews_tmp)!=0))
{
int l9_159=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_159=0;
}
else
{
l9_159=in.varStereoViewID;
}
int l9_160=l9_159;
l9_158=1-l9_160;
}
else
{
int l9_161=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_161=0;
}
else
{
l9_161=in.varStereoViewID;
}
int l9_162=l9_161;
l9_158=l9_162;
}
int l9_163=l9_158;
float2 l9_164=l9_156;
int l9_165=sc_EnvmapDiffuseLayout_tmp;
int l9_166=l9_163;
float l9_167=l9_157;
float2 l9_168=l9_164;
int l9_169=l9_165;
int l9_170=l9_166;
float3 l9_171=float3(0.0);
if (l9_169==0)
{
l9_171=float3(l9_168,0.0);
}
else
{
if (l9_169==1)
{
l9_171=float3(l9_168.x,(l9_168.y*0.5)+(0.5-(float(l9_170)*0.5)),0.0);
}
else
{
l9_171=float3(l9_168,float(l9_170));
}
}
float3 l9_172=l9_171;
float3 l9_173=l9_172;
float4 l9_174=sc_set0.sc_EnvmapDiffuse.sample(sc_set0.sc_EnvmapDiffuseSmpSC,l9_173.xy,bias(l9_167));
float4 l9_175=l9_174;
l9_129=l9_175;
}
else
{
float2 l9_176=l9_128;
float l9_177=13.0;
int l9_178;
if ((int(sc_EnvmapSpecularHasSwappedViews_tmp)!=0))
{
int l9_179=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_179=0;
}
else
{
l9_179=in.varStereoViewID;
}
int l9_180=l9_179;
l9_178=1-l9_180;
}
else
{
int l9_181=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_181=0;
}
else
{
l9_181=in.varStereoViewID;
}
int l9_182=l9_181;
l9_178=l9_182;
}
int l9_183=l9_178;
float2 l9_184=l9_176;
int l9_185=sc_EnvmapSpecularLayout_tmp;
int l9_186=l9_183;
float l9_187=l9_177;
float2 l9_188=l9_184;
int l9_189=l9_185;
int l9_190=l9_186;
float3 l9_191=float3(0.0);
if (l9_189==0)
{
l9_191=float3(l9_188,0.0);
}
else
{
if (l9_189==1)
{
l9_191=float3(l9_188.x,(l9_188.y*0.5)+(0.5-(float(l9_190)*0.5)),0.0);
}
else
{
l9_191=float3(l9_188,float(l9_190));
}
}
float3 l9_192=l9_191;
float3 l9_193=l9_192;
float4 l9_194=sc_set0.sc_EnvmapSpecular.sample(sc_set0.sc_EnvmapSpecularSmpSC,l9_193.xy,bias(l9_187));
float4 l9_195=l9_194;
l9_129=l9_195;
}
}
float4 l9_196=l9_129;
float3 l9_197=l9_196.xyz*(1.0/l9_196.w);
float3 l9_198=l9_197*(*sc_set0.UserUniforms).sc_EnvmapExposure;
l9_118=l9_198;
}
else
{
if (sc_EnvLightMode_tmp==sc_AmbientLightMode_SphericalHarmonics_tmp)
{
float3 l9_199=(*sc_set0.UserUniforms).sc_Sh[0];
float3 l9_200=(*sc_set0.UserUniforms).sc_Sh[1];
float3 l9_201=(*sc_set0.UserUniforms).sc_Sh[2];
float3 l9_202=(*sc_set0.UserUniforms).sc_Sh[3];
float3 l9_203=(*sc_set0.UserUniforms).sc_Sh[4];
float3 l9_204=(*sc_set0.UserUniforms).sc_Sh[5];
float3 l9_205=(*sc_set0.UserUniforms).sc_Sh[6];
float3 l9_206=(*sc_set0.UserUniforms).sc_Sh[7];
float3 l9_207=(*sc_set0.UserUniforms).sc_Sh[8];
float3 l9_208=-l9_117;
float l9_209=0.0;
l9_209=l9_208.x;
float l9_210=l9_208.y;
float l9_211=l9_208.z;
float l9_212=l9_209*l9_209;
float l9_213=l9_210*l9_210;
float l9_214=l9_211*l9_211;
float l9_215=l9_209*l9_210;
float l9_216=l9_210*l9_211;
float l9_217=l9_209*l9_211;
float3 l9_218=((((((l9_207*0.42904299)*(l9_212-l9_213))+((l9_205*0.74312502)*l9_214))+(l9_199*0.88622701))-(l9_205*0.24770799))+((((l9_203*l9_215)+(l9_206*l9_217))+(l9_204*l9_216))*0.85808599))+((((l9_202*l9_209)+(l9_200*l9_210))+(l9_201*l9_211))*1.0233279);
l9_118=l9_218*(*sc_set0.UserUniforms).sc_ShIntensity;
}
}
if (((*sc_set0.UserUniforms).sc_RayTracingReceiverEffectsMask&2)!=0)
{
float4 l9_219=gl_FragCoord;
float2 l9_220=l9_219.xy*(*sc_set0.UserUniforms).sc_CurrentRenderTargetDims.zw;
float2 l9_221=l9_220;
float2 l9_222=l9_221;
float l9_223=0.0;
int l9_224;
if ((int(sc_RayTracingGlobalIlluminationHasSwappedViews_tmp)!=0))
{
int l9_225=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_225=0;
}
else
{
l9_225=in.varStereoViewID;
}
int l9_226=l9_225;
l9_224=1-l9_226;
}
else
{
int l9_227=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_227=0;
}
else
{
l9_227=in.varStereoViewID;
}
int l9_228=l9_227;
l9_224=l9_228;
}
int l9_229=l9_224;
float2 l9_230=l9_222;
int l9_231=sc_RayTracingGlobalIlluminationLayout_tmp;
int l9_232=l9_229;
float l9_233=l9_223;
float2 l9_234=l9_230;
int l9_235=l9_231;
int l9_236=l9_232;
float3 l9_237=float3(0.0);
if (l9_235==0)
{
l9_237=float3(l9_234,0.0);
}
else
{
if (l9_235==1)
{
l9_237=float3(l9_234.x,(l9_234.y*0.5)+(0.5-(float(l9_236)*0.5)),0.0);
}
else
{
l9_237=float3(l9_234,float(l9_236));
}
}
float3 l9_238=l9_237;
float3 l9_239=l9_238;
float4 l9_240=sc_set0.sc_RayTracingGlobalIllumination.sample(sc_set0.sc_RayTracingGlobalIlluminationSmpSC,l9_239.xy,bias(l9_233));
float4 l9_241=l9_240;
float4 l9_242=l9_241;
float4 l9_243=l9_242;
l9_118=mix(l9_118,l9_243.xyz,float3(l9_243.w));
}
if (sc_AmbientLightsCount_tmp>0)
{
if (sc_AmbientLightMode0_tmp==sc_AmbientLightMode_Constant_tmp)
{
l9_118+=((*sc_set0.UserUniforms).sc_AmbientLights[0].color*(*sc_set0.UserUniforms).sc_AmbientLights[0].intensity);
}
else
{
l9_118.x+=(1e-06*(*sc_set0.UserUniforms).sc_AmbientLights[0].color.x);
}
}
if (sc_AmbientLightsCount_tmp>1)
{
if (sc_AmbientLightMode1_tmp==sc_AmbientLightMode_Constant_tmp)
{
l9_118+=((*sc_set0.UserUniforms).sc_AmbientLights[1].color*(*sc_set0.UserUniforms).sc_AmbientLights[1].intensity);
}
else
{
l9_118.x+=(1e-06*(*sc_set0.UserUniforms).sc_AmbientLights[1].color.x);
}
}
if (sc_AmbientLightsCount_tmp>2)
{
if (sc_AmbientLightMode2_tmp==sc_AmbientLightMode_Constant_tmp)
{
l9_118+=((*sc_set0.UserUniforms).sc_AmbientLights[2].color*(*sc_set0.UserUniforms).sc_AmbientLights[2].intensity);
}
else
{
l9_118.x+=(1e-06*(*sc_set0.UserUniforms).sc_AmbientLights[2].color.x);
}
}
if ((int(sc_LightEstimation_tmp)!=0))
{
float3 l9_244=l9_117;
float3 l9_245=(*sc_set0.UserUniforms).sc_LightEstimationData.ambientLight;
sc_SphericalGaussianLight_t l9_246;
float l9_247;
int l9_248=0;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_248<sc_LightEstimationSGCount_tmp)
{
l9_246.color=(*sc_set0.UserUniforms).sc_LightEstimationData.sg[l9_248].color;
l9_246.sharpness=(*sc_set0.UserUniforms).sc_LightEstimationData.sg[l9_248].sharpness;
l9_246.axis=(*sc_set0.UserUniforms).sc_LightEstimationData.sg[l9_248].axis;
float3 l9_249=l9_244;
float l9_250=dot(l9_246.axis,l9_249);
float l9_251=l9_246.sharpness;
float l9_252=0.36000001;
float l9_253=1.0/(4.0*l9_252);
float l9_254=exp(-l9_251);
float l9_255=l9_254*l9_254;
float l9_256=1.0/l9_251;
float l9_257=(1.0+(2.0*l9_255))-l9_256;
float l9_258=((l9_254-l9_255)*l9_256)-l9_255;
float l9_259=sqrt(1.0-l9_257);
float l9_260=l9_252*l9_250;
float l9_261=l9_253*l9_259;
float l9_262=l9_260+l9_261;
float l9_263=l9_250;
float l9_264=fast::clamp(l9_263,0.0,1.0);
float l9_265=l9_264;
if (step(abs(l9_260),l9_261)>0.5)
{
l9_247=(l9_262*l9_262)/l9_259;
}
else
{
l9_247=l9_265;
}
l9_265=l9_247;
float l9_266=(l9_257*l9_265)+l9_258;
sc_SphericalGaussianLight_t l9_267=l9_246;
float3 l9_268=(l9_267.color/float3(l9_267.sharpness))*6.2831855;
float3 l9_269=(l9_268*l9_266)/float3(3.1415927);
l9_245+=l9_269;
l9_248++;
continue;
}
else
{
break;
}
}
float3 l9_270=l9_245;
l9_118+=l9_270;
}
float3 l9_271=l9_118;
float3 l9_272=l9_271;
l9_35.indirectDiffuse=l9_272;
SurfaceProperties l9_273=l9_32;
float3 l9_274=l9_36;
float3 l9_275=float3(0.0);
if ((sc_EnvLightMode_tmp==sc_AmbientLightMode_EnvironmentMap_tmp)||(sc_EnvLightMode_tmp==sc_AmbientLightMode_FromCamera_tmp))
{
SurfaceProperties l9_276=l9_273;
float3 l9_277=l9_274;
float3 l9_278=l9_276.normal;
float3 l9_279=reflect(-l9_277,l9_278);
float3 l9_280=l9_278;
float3 l9_281=l9_279;
float l9_282=l9_276.roughness;
l9_279=getSpecularDominantDir(l9_280,l9_281,l9_282);
float l9_283=l9_276.roughness;
float l9_284=pow(l9_283,0.66666669);
float l9_285=fast::clamp(l9_284,0.0,1.0);
float l9_286=l9_285*5.0;
float l9_287=l9_286;
float l9_288=l9_287;
float3 l9_289=l9_279;
float l9_290=l9_288;
float3 l9_291=l9_289;
float l9_292=l9_290;
float4 l9_293=float4(0.0);
float3 l9_294=l9_291;
float l9_295=(*sc_set0.UserUniforms).sc_EnvmapRotation.y;
float2 l9_296=float2(0.0);
float l9_297=l9_294.x;
float l9_298=-l9_294.z;
float l9_299=(l9_297<0.0) ? (-1.0) : 1.0;
float l9_300=l9_299*acos(fast::clamp(l9_298/length(float2(l9_297,l9_298)),-1.0,1.0));
l9_296.x=l9_300-1.5707964;
l9_296.y=acos(l9_294.y);
l9_296/=float2(6.2831855,3.1415927);
l9_296.y=1.0-l9_296.y;
l9_296.x+=(l9_295/360.0);
l9_296.x=fract((l9_296.x+floor(l9_296.x))+1.0);
float2 l9_301=l9_296;
float2 l9_302=l9_301;
if (SC_DEVICE_CLASS_tmp>=2)
{
float l9_303=floor(l9_292);
float l9_304=ceil(l9_292);
float l9_305=l9_292-l9_303;
float2 l9_306=l9_302;
float2 l9_307=(*sc_set0.UserUniforms).sc_EnvmapSpecularSize.xy;
float l9_308=l9_303;
float2 l9_309=calcSeamlessPanoramicUvsForSampling(l9_306,l9_307,l9_308);
float2 l9_310=l9_309;
float l9_311=l9_303;
float2 l9_312=l9_310;
float l9_313=l9_311;
int l9_314;
if ((int(sc_EnvmapSpecularHasSwappedViews_tmp)!=0))
{
int l9_315=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_315=0;
}
else
{
l9_315=in.varStereoViewID;
}
int l9_316=l9_315;
l9_314=1-l9_316;
}
else
{
int l9_317=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_317=0;
}
else
{
l9_317=in.varStereoViewID;
}
int l9_318=l9_317;
l9_314=l9_318;
}
int l9_319=l9_314;
float2 l9_320=l9_312;
int l9_321=sc_EnvmapSpecularLayout_tmp;
int l9_322=l9_319;
float l9_323=l9_313;
float2 l9_324=l9_320;
int l9_325=l9_321;
int l9_326=l9_322;
float3 l9_327=float3(0.0);
if (l9_325==0)
{
l9_327=float3(l9_324,0.0);
}
else
{
if (l9_325==1)
{
l9_327=float3(l9_324.x,(l9_324.y*0.5)+(0.5-(float(l9_326)*0.5)),0.0);
}
else
{
l9_327=float3(l9_324,float(l9_326));
}
}
float3 l9_328=l9_327;
float3 l9_329=l9_328;
float4 l9_330=sc_set0.sc_EnvmapSpecular.sample(sc_set0.sc_EnvmapSpecularSmpSC,l9_329.xy,level(l9_323));
float4 l9_331=l9_330;
float4 l9_332=l9_331;
float4 l9_333=l9_332;
float2 l9_334=l9_302;
float2 l9_335=(*sc_set0.UserUniforms).sc_EnvmapSpecularSize.xy;
float l9_336=l9_304;
float2 l9_337=calcSeamlessPanoramicUvsForSampling(l9_334,l9_335,l9_336);
float2 l9_338=l9_337;
float l9_339=l9_304;
float2 l9_340=l9_338;
float l9_341=l9_339;
int l9_342;
if ((int(sc_EnvmapSpecularHasSwappedViews_tmp)!=0))
{
int l9_343=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_343=0;
}
else
{
l9_343=in.varStereoViewID;
}
int l9_344=l9_343;
l9_342=1-l9_344;
}
else
{
int l9_345=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_345=0;
}
else
{
l9_345=in.varStereoViewID;
}
int l9_346=l9_345;
l9_342=l9_346;
}
int l9_347=l9_342;
float2 l9_348=l9_340;
int l9_349=sc_EnvmapSpecularLayout_tmp;
int l9_350=l9_347;
float l9_351=l9_341;
float2 l9_352=l9_348;
int l9_353=l9_349;
int l9_354=l9_350;
float3 l9_355=float3(0.0);
if (l9_353==0)
{
l9_355=float3(l9_352,0.0);
}
else
{
if (l9_353==1)
{
l9_355=float3(l9_352.x,(l9_352.y*0.5)+(0.5-(float(l9_354)*0.5)),0.0);
}
else
{
l9_355=float3(l9_352,float(l9_354));
}
}
float3 l9_356=l9_355;
float3 l9_357=l9_356;
float4 l9_358=sc_set0.sc_EnvmapSpecular.sample(sc_set0.sc_EnvmapSpecularSmpSC,l9_357.xy,level(l9_351));
float4 l9_359=l9_358;
float4 l9_360=l9_359;
float4 l9_361=l9_360;
l9_293=mix(l9_333,l9_361,float4(l9_305));
}
else
{
float2 l9_362=l9_302;
float l9_363=l9_292;
float2 l9_364=l9_362;
float l9_365=l9_363;
int l9_366;
if ((int(sc_EnvmapSpecularHasSwappedViews_tmp)!=0))
{
int l9_367=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_367=0;
}
else
{
l9_367=in.varStereoViewID;
}
int l9_368=l9_367;
l9_366=1-l9_368;
}
else
{
int l9_369=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_369=0;
}
else
{
l9_369=in.varStereoViewID;
}
int l9_370=l9_369;
l9_366=l9_370;
}
int l9_371=l9_366;
float2 l9_372=l9_364;
int l9_373=sc_EnvmapSpecularLayout_tmp;
int l9_374=l9_371;
float l9_375=l9_365;
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
float4 l9_382=sc_set0.sc_EnvmapSpecular.sample(sc_set0.sc_EnvmapSpecularSmpSC,l9_381.xy,level(l9_375));
float4 l9_383=l9_382;
float4 l9_384=l9_383;
l9_293=l9_384;
}
float4 l9_385=l9_293;
float3 l9_386=l9_385.xyz*(1.0/l9_385.w);
float3 l9_387=l9_386;
float3 l9_388=l9_387*(*sc_set0.UserUniforms).sc_EnvmapExposure;
l9_388+=float3(1e-06);
float3 l9_389=l9_388;
float3 l9_390=l9_389;
if (((*sc_set0.UserUniforms).sc_RayTracingReceiverEffectsMask&1)!=0)
{
float4 l9_391=gl_FragCoord;
float2 l9_392=l9_391.xy*(*sc_set0.UserUniforms).sc_CurrentRenderTargetDims.zw;
float2 l9_393=l9_392;
float2 l9_394=l9_393;
float l9_395=0.0;
int l9_396;
if ((int(sc_RayTracingReflectionsHasSwappedViews_tmp)!=0))
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
l9_396=1-l9_398;
}
else
{
int l9_399=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_399=0;
}
else
{
l9_399=in.varStereoViewID;
}
int l9_400=l9_399;
l9_396=l9_400;
}
int l9_401=l9_396;
float2 l9_402=l9_394;
int l9_403=sc_RayTracingReflectionsLayout_tmp;
int l9_404=l9_401;
float l9_405=l9_395;
float2 l9_406=l9_402;
int l9_407=l9_403;
int l9_408=l9_404;
float3 l9_409=float3(0.0);
if (l9_407==0)
{
l9_409=float3(l9_406,0.0);
}
else
{
if (l9_407==1)
{
l9_409=float3(l9_406.x,(l9_406.y*0.5)+(0.5-(float(l9_408)*0.5)),0.0);
}
else
{
l9_409=float3(l9_406,float(l9_408));
}
}
float3 l9_410=l9_409;
float3 l9_411=l9_410;
float4 l9_412=sc_set0.sc_RayTracingReflections.sample(sc_set0.sc_RayTracingReflectionsSmpSC,l9_411.xy,bias(l9_405));
float4 l9_413=l9_412;
float4 l9_414=l9_413;
float4 l9_415=l9_414;
l9_390=mix(l9_390,l9_415.xyz,float3(l9_415.w));
}
SurfaceProperties l9_416=l9_276;
float l9_417=abs(dot(l9_278,l9_277));
float3 l9_418=l9_390*envBRDFApprox(l9_416,l9_417);
l9_275+=l9_418;
}
if ((int(sc_LightEstimation_tmp)!=0))
{
SurfaceProperties l9_419=l9_273;
float3 l9_420=l9_274;
float l9_421=fast::clamp(l9_419.roughness*l9_419.roughness,0.0099999998,1.0);
float3 l9_422=(*sc_set0.UserUniforms).sc_LightEstimationData.ambientLight*l9_419.specColor;
sc_SphericalGaussianLight_t l9_423;
sc_SphericalGaussianLight_t l9_424;
sc_SphericalGaussianLight_t l9_425;
int l9_426=0;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_426<sc_LightEstimationSGCount_tmp)
{
l9_423.color=(*sc_set0.UserUniforms).sc_LightEstimationData.sg[l9_426].color;
l9_423.sharpness=(*sc_set0.UserUniforms).sc_LightEstimationData.sg[l9_426].sharpness;
l9_423.axis=(*sc_set0.UserUniforms).sc_LightEstimationData.sg[l9_426].axis;
float3 l9_427=l9_419.normal;
float l9_428=l9_421;
float3 l9_429=l9_420;
float3 l9_430=l9_419.specColor;
float3 l9_431=l9_427;
float l9_432=l9_428;
l9_424.axis=l9_431;
float l9_433=l9_432*l9_432;
l9_424.sharpness=2.0/l9_433;
l9_424.color=float3(1.0/(3.1415927*l9_433));
sc_SphericalGaussianLight_t l9_434=l9_424;
sc_SphericalGaussianLight_t l9_435=l9_434;
sc_SphericalGaussianLight_t l9_436=l9_435;
float3 l9_437=l9_429;
l9_425.axis=reflect(-l9_437,l9_436.axis);
l9_425.color=l9_436.color;
l9_425.sharpness=l9_436.sharpness;
l9_425.sharpness/=(4.0*fast::max(dot(l9_436.axis,l9_437),9.9999997e-05));
sc_SphericalGaussianLight_t l9_438=l9_425;
sc_SphericalGaussianLight_t l9_439=l9_438;
sc_SphericalGaussianLight_t l9_440=l9_439;
sc_SphericalGaussianLight_t l9_441=l9_423;
float l9_442=length((l9_440.axis*l9_440.sharpness)+(l9_441.axis*l9_441.sharpness));
float3 l9_443=(l9_440.color*exp((l9_442-l9_440.sharpness)-l9_441.sharpness))*l9_441.color;
float l9_444=1.0-exp((-2.0)*l9_442);
float3 l9_445=((l9_443*6.2831855)*l9_444)/float3(l9_442);
float3 l9_446=l9_445;
float3 l9_447=l9_439.axis;
float l9_448=l9_428*l9_428;
float l9_449=dot(l9_427,l9_447);
float l9_450=fast::clamp(l9_449,0.0,1.0);
float l9_451=l9_450;
float l9_452=dot(l9_427,l9_429);
float l9_453=fast::clamp(l9_452,0.0,1.0);
float l9_454=l9_453;
float3 l9_455=normalize(l9_439.axis+l9_429);
float l9_456=l9_448;
float l9_457=l9_451;
float l9_458=1.0/(l9_457+sqrt(l9_456+(((1.0-l9_456)*l9_457)*l9_457)));
float l9_459=l9_448;
float l9_460=l9_454;
float l9_461=1.0/(l9_460+sqrt(l9_459+(((1.0-l9_459)*l9_460)*l9_460)));
l9_446*=(l9_458*l9_461);
float l9_462=dot(l9_447,l9_455);
float l9_463=fast::clamp(l9_462,0.0,1.0);
float l9_464=pow(1.0-l9_463,5.0);
l9_446*=(l9_430+((float3(1.0)-l9_430)*l9_464));
l9_446*=l9_451;
float3 l9_465=l9_446;
l9_422+=l9_465;
l9_426++;
continue;
}
else
{
break;
}
}
float3 l9_466=l9_422;
l9_275+=l9_466;
}
float3 l9_467=l9_275;
l9_35.indirectSpecular=l9_467;
LightingComponents l9_468=l9_35;
LightingComponents l9_469=l9_468;
if ((int(sc_BlendMode_ColoredGlass_tmp)!=0))
{
l9_469.directDiffuse=float3(0.0);
l9_469.indirectDiffuse=float3(0.0);
float4 l9_470=float4(0.0);
if ((int(sc_FramebufferFetch_tmp)!=0))
{
float4 l9_471=out.FragColor0;
float4 l9_472=l9_471;
l9_470=l9_472;
}
else
{
float4 l9_473=gl_FragCoord;
float2 l9_474=l9_473.xy*(*sc_set0.UserUniforms).sc_CurrentRenderTargetDims.zw;
float2 l9_475=l9_474;
float2 l9_476=float2(0.0);
if (sc_StereoRenderingMode_tmp==1)
{
int l9_477=1;
int l9_478=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_478=0;
}
else
{
l9_478=in.varStereoViewID;
}
int l9_479=l9_478;
int l9_480=l9_479;
float3 l9_481=float3(l9_475,0.0);
int l9_482=l9_477;
int l9_483=l9_480;
if (l9_482==1)
{
l9_481.y=((2.0*l9_481.y)+float(l9_483))-1.0;
}
float2 l9_484=l9_481.xy;
l9_476=l9_484;
}
else
{
l9_476=l9_475;
}
float2 l9_485=l9_476;
float2 l9_486=l9_485;
float2 l9_487=l9_486;
float2 l9_488=l9_487;
float l9_489=0.0;
int l9_490;
if ((int(sc_ScreenTextureHasSwappedViews_tmp)!=0))
{
int l9_491=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_491=0;
}
else
{
l9_491=in.varStereoViewID;
}
int l9_492=l9_491;
l9_490=1-l9_492;
}
else
{
int l9_493=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_493=0;
}
else
{
l9_493=in.varStereoViewID;
}
int l9_494=l9_493;
l9_490=l9_494;
}
int l9_495=l9_490;
float2 l9_496=l9_488;
int l9_497=sc_ScreenTextureLayout_tmp;
int l9_498=l9_495;
float l9_499=l9_489;
float2 l9_500=l9_496;
int l9_501=l9_497;
int l9_502=l9_498;
float3 l9_503=float3(0.0);
if (l9_501==0)
{
l9_503=float3(l9_500,0.0);
}
else
{
if (l9_501==1)
{
l9_503=float3(l9_500.x,(l9_500.y*0.5)+(0.5-(float(l9_502)*0.5)),0.0);
}
else
{
l9_503=float3(l9_500,float(l9_502));
}
}
float3 l9_504=l9_503;
float3 l9_505=l9_504;
float4 l9_506=sc_set0.sc_ScreenTexture.sample(sc_set0.sc_ScreenTextureSmpSC,l9_505.xy,bias(l9_499));
float4 l9_507=l9_506;
float4 l9_508=l9_507;
l9_470=l9_508;
}
float4 l9_509=l9_470;
float3 l9_510=l9_509.xyz;
float3 l9_511;
if (SC_DEVICE_CLASS_tmp>=2)
{
l9_511=float3(pow(l9_510.x,2.2),pow(l9_510.y,2.2),pow(l9_510.z,2.2));
}
else
{
l9_511=l9_510*l9_510;
}
float3 l9_512=l9_511;
float3 l9_513=l9_512;
l9_469.transmitted=l9_513*mix(float3(1.0),l9_19.albedo,float3(l9_19.opacity));
l9_19.opacity=1.0;
}
bool l9_514=false;
if ((int(sc_BlendMode_PremultipliedAlpha_tmp)!=0))
{
l9_514=true;
}
SurfaceProperties l9_515=l9_19;
LightingComponents l9_516=l9_469;
bool l9_517=l9_514;
float3 l9_518=l9_515.albedo*(l9_516.directDiffuse+(l9_516.indirectDiffuse*l9_515.ao));
float3 l9_519=l9_516.directSpecular+(l9_516.indirectSpecular*l9_515.specularAo);
float3 l9_520=l9_515.emissive;
float3 l9_521=l9_516.transmitted;
if (l9_517)
{
float l9_522=l9_515.opacity;
l9_518*=srgbToLinear(l9_522);
}
float3 l9_523=((l9_518+l9_519)+l9_520)+l9_521;
float3 l9_524=l9_523;
float4 l9_525=float4(l9_524,l9_19.opacity);
if ((int(sc_IsEditor_tmp)!=0))
{
l9_525.x+=((l9_19.ao.x*l9_19.specularAo.x)*9.9999997e-06);
}
if (!(int(sc_BlendMode_Multiply_tmp)!=0))
{
float3 l9_526=l9_525.xyz;
float l9_527=1.8;
float l9_528=1.4;
float l9_529=0.5;
float l9_530=1.5;
float3 l9_531=(l9_526*((l9_526*l9_527)+float3(l9_528)))/((l9_526*((l9_526*l9_527)+float3(l9_529)))+float3(l9_530));
l9_525=float4(l9_531.x,l9_531.y,l9_531.z,l9_525.w);
}
float3 l9_532=l9_525.xyz;
float l9_533=l9_532.x;
float l9_534=l9_532.y;
float l9_535=l9_532.z;
float3 l9_536=float3(linearToSrgb(l9_533),linearToSrgb(l9_534),linearToSrgb(l9_535));
l9_525=float4(l9_536.x,l9_536.y,l9_536.z,l9_525.w);
float4 l9_537=l9_525;
param_15=l9_537;
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
float4 l9_538=param_20;
float4 l9_539=l9_538;
float l9_540=1.0;
if ((((int(sc_BlendMode_Normal_tmp)!=0)||(int(sc_BlendMode_AlphaToCoverage_tmp)!=0))||(int(sc_BlendMode_PremultipliedAlphaHardware_tmp)!=0))||(int(sc_BlendMode_PremultipliedAlphaAuto_tmp)!=0))
{
l9_540=l9_539.w;
}
else
{
if ((int(sc_BlendMode_PremultipliedAlpha_tmp)!=0))
{
l9_540=fast::clamp(l9_539.w*2.0,0.0,1.0);
}
else
{
if ((int(sc_BlendMode_AddWithAlphaFactor_tmp)!=0))
{
l9_540=fast::clamp(dot(l9_539.xyz,float3(l9_539.w)),0.0,1.0);
}
else
{
if ((int(sc_BlendMode_AlphaTest_tmp)!=0))
{
l9_540=1.0;
}
else
{
if ((int(sc_BlendMode_Multiply_tmp)!=0))
{
l9_540=(1.0-dot(l9_539.xyz,float3(0.33333001)))*l9_539.w;
}
else
{
if ((int(sc_BlendMode_MultiplyOriginal_tmp)!=0))
{
l9_540=(1.0-fast::clamp(dot(l9_539.xyz,float3(1.0)),0.0,1.0))*l9_539.w;
}
else
{
if ((int(sc_BlendMode_ColoredGlass_tmp)!=0))
{
l9_540=fast::clamp(dot(l9_539.xyz,float3(1.0)),0.0,1.0)*l9_539.w;
}
else
{
if ((int(sc_BlendMode_Add_tmp)!=0))
{
l9_540=fast::clamp(dot(l9_539.xyz,float3(1.0)),0.0,1.0);
}
else
{
if ((int(sc_BlendMode_AddWithAlphaFactor_tmp)!=0))
{
l9_540=fast::clamp(dot(l9_539.xyz,float3(1.0)),0.0,1.0)*l9_539.w;
}
else
{
if ((int(sc_BlendMode_Screen_tmp)!=0))
{
l9_540=dot(l9_539.xyz,float3(0.33333001))*l9_539.w;
}
else
{
if ((int(sc_BlendMode_Min_tmp)!=0))
{
l9_540=1.0-fast::clamp(dot(l9_539.xyz,float3(1.0)),0.0,1.0);
}
else
{
if ((int(sc_BlendMode_Max_tmp)!=0))
{
l9_540=fast::clamp(dot(l9_539.xyz,float3(1.0)),0.0,1.0);
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
float l9_541=l9_540;
float l9_542=l9_541;
float l9_543=(*sc_set0.UserUniforms).sc_ShadowDensity*l9_542;
float3 l9_544=mix((*sc_set0.UserUniforms).sc_ShadowColor.xyz,(*sc_set0.UserUniforms).sc_ShadowColor.xyz*l9_538.xyz,float3((*sc_set0.UserUniforms).sc_ShadowColor.w));
float4 l9_545=float4(l9_544.x,l9_544.y,l9_544.z,l9_543);
param_20=l9_545;
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
float4 l9_546=param_20;
float4 l9_547=float4(0.0);
float4 l9_548=float4(0.0);
if ((int(sc_FramebufferFetch_tmp)!=0))
{
float4 l9_549=out.FragColor0;
float4 l9_550=l9_549;
l9_548=l9_550;
}
else
{
float4 l9_551=gl_FragCoord;
float2 l9_552=l9_551.xy*(*sc_set0.UserUniforms).sc_CurrentRenderTargetDims.zw;
float2 l9_553=l9_552;
float2 l9_554=float2(0.0);
if (sc_StereoRenderingMode_tmp==1)
{
int l9_555=1;
int l9_556=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_556=0;
}
else
{
l9_556=in.varStereoViewID;
}
int l9_557=l9_556;
int l9_558=l9_557;
float3 l9_559=float3(l9_553,0.0);
int l9_560=l9_555;
int l9_561=l9_558;
if (l9_560==1)
{
l9_559.y=((2.0*l9_559.y)+float(l9_561))-1.0;
}
float2 l9_562=l9_559.xy;
l9_554=l9_562;
}
else
{
l9_554=l9_553;
}
float2 l9_563=l9_554;
float2 l9_564=l9_563;
float2 l9_565=l9_564;
float2 l9_566=l9_565;
float l9_567=0.0;
int l9_568;
if ((int(sc_ScreenTextureHasSwappedViews_tmp)!=0))
{
int l9_569=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_569=0;
}
else
{
l9_569=in.varStereoViewID;
}
int l9_570=l9_569;
l9_568=1-l9_570;
}
else
{
int l9_571=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_571=0;
}
else
{
l9_571=in.varStereoViewID;
}
int l9_572=l9_571;
l9_568=l9_572;
}
int l9_573=l9_568;
float2 l9_574=l9_566;
int l9_575=sc_ScreenTextureLayout_tmp;
int l9_576=l9_573;
float l9_577=l9_567;
float2 l9_578=l9_574;
int l9_579=l9_575;
int l9_580=l9_576;
float3 l9_581=float3(0.0);
if (l9_579==0)
{
l9_581=float3(l9_578,0.0);
}
else
{
if (l9_579==1)
{
l9_581=float3(l9_578.x,(l9_578.y*0.5)+(0.5-(float(l9_580)*0.5)),0.0);
}
else
{
l9_581=float3(l9_578,float(l9_580));
}
}
float3 l9_582=l9_581;
float3 l9_583=l9_582;
float4 l9_584=sc_set0.sc_ScreenTexture.sample(sc_set0.sc_ScreenTextureSmpSC,l9_583.xy,bias(l9_577));
float4 l9_585=l9_584;
float4 l9_586=l9_585;
l9_548=l9_586;
}
float4 l9_587=l9_548;
float3 l9_588=l9_587.xyz;
float3 l9_589=l9_588;
float3 l9_590=l9_546.xyz;
float3 l9_591=definedBlend(l9_589,l9_590,in.varStereoViewID,(*sc_set0.UserUniforms),sc_set0.intensityTexture,sc_set0.intensityTextureSmpSC);
l9_547=float4(l9_591.x,l9_591.y,l9_591.z,l9_547.w);
float3 l9_592=mix(l9_588,l9_547.xyz,float3(l9_546.w));
l9_547=float4(l9_592.x,l9_592.y,l9_592.z,l9_547.w);
l9_547.w=1.0;
float4 l9_593=l9_547;
param_20=l9_593;
}
else
{
if ((int(sc_Voxelization_tmp)!=0))
{
float4 l9_594=float4(in.varScreenPos.xyz,1.0);
param_20=l9_594;
}
else
{
if ((int(sc_OutputBounds_tmp)!=0))
{
float4 l9_595=gl_FragCoord;
float l9_596=fast::clamp(abs(l9_595.z),0.0,1.0);
float4 l9_597=float4(l9_596,1.0-l9_596,1.0,1.0);
param_20=l9_597;
}
else
{
float4 l9_598=param_20;
float4 l9_599=float4(0.0);
if ((int(sc_BlendMode_MultiplyOriginal_tmp)!=0))
{
l9_599=float4(mix(float3(1.0),l9_598.xyz,float3(l9_598.w)),l9_598.w);
}
else
{
if ((int(sc_BlendMode_Screen_tmp)!=0)||(int(sc_BlendMode_PremultipliedAlphaAuto_tmp)!=0))
{
float l9_600=l9_598.w;
if ((int(sc_BlendMode_PremultipliedAlphaAuto_tmp)!=0))
{
l9_600=fast::clamp(l9_600,0.0,1.0);
}
l9_599=float4(l9_598.xyz*l9_600,l9_600);
}
else
{
l9_599=l9_598;
}
}
float4 l9_601=l9_599;
param_20=l9_601;
}
}
}
}
}
float4 l9_602=param_20;
FinalColor=l9_602;
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
float4 l9_603=float4(0.0);
l9_603=float4(0.0);
float4 l9_604=l9_603;
float4 Cost=l9_604;
if (Cost.w>0.0)
{
FinalColor=Cost;
}
FinalColor=fast::max(FinalColor,float4(0.0));
float3 param_21=in.varPos;
float4 param_22=FinalColor;
FinalColor=sc_OutputMotionVectorsIfNeeded(param_21,param_22,in.varStereoViewID,(*sc_set0.UserUniforms));
float4 param_23=FinalColor;
float4 l9_605=param_23;
if (sc_ShaderCacheConstant_tmp!=0)
{
l9_605.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
out.FragColor0=l9_605;
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
float shaderComplexityValue;
float4 weights0;
float4 weights1;
float4 weights2;
float4 sc_StereoClipPlanes[2];
int sc_FallbackInstanceID;
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
int sc_RayTracingReceiverEffectsMask;
float4 sc_RayTracingReflectionsSize;
float4 sc_RayTracingReflectionsDims;
float4 sc_RayTracingReflectionsView;
float4 sc_RayTracingGlobalIlluminationSize;
float4 sc_RayTracingGlobalIlluminationDims;
float4 sc_RayTracingGlobalIlluminationView;
float4 sc_RayTracingShadowsSize;
float4 sc_RayTracingShadowsDims;
float4 sc_RayTracingShadowsView;
float3 sc_RayTracingOriginScale;
uint sc_RayTracingReceiverMask;
float3 sc_RayTracingOriginScaleInv;
float3 sc_RayTracingOriginOffset;
uint sc_RayTracingReceiverId;
float4 voxelization_params_0;
float4 voxelization_params_frustum_lrbt;
float4 voxelization_params_frustum_nf;
float3 voxelization_params_camera_pos;
float4x4 sc_ModelMatrixVoxelization;
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
texture2d<float> sc_RayTracingGlobalIllumination [[id(12)]];
texture2d<float> sc_RayTracingReflections [[id(13)]];
texture2d<float> sc_RayTracingShadows [[id(14)]];
texture2d<float> sc_SSAOTexture [[id(15)]];
texture2d<float> sc_ScreenTexture [[id(16)]];
texture2d<float> sc_ShadowTexture [[id(17)]];
sampler intensityTextureSmpSC [[id(19)]];
sampler sc_EnvmapDiffuseSmpSC [[id(20)]];
sampler sc_EnvmapSpecularSmpSC [[id(21)]];
sampler sc_RayTracingGlobalIlluminationSmpSC [[id(23)]];
sampler sc_RayTracingReflectionsSmpSC [[id(24)]];
sampler sc_RayTracingShadowsSmpSC [[id(25)]];
sampler sc_SSAOTextureSmpSC [[id(26)]];
sampler sc_ScreenTextureSmpSC [[id(27)]];
sampler sc_ShadowTextureSmpSC [[id(28)]];
constant userUniformsObj* UserUniforms [[id(30)]];
};
struct main_recv_out
{
uint4 sc_RayTracingPositionAndMask [[color(0)]];
uint4 sc_RayTracingNormalAndMore [[color(1)]];
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
float3 l9_10=l9_7;
float3 l9_11=l9_8;
float l9_12=l9_9;
uint l9_13=0u;
uint3 l9_14=uint3(round((l9_10-(*sc_set0.UserUniforms).sc_RayTracingOriginOffset)*(*sc_set0.UserUniforms).sc_RayTracingOriginScale));
out.sc_RayTracingPositionAndMask=uint4(l9_14.x,l9_14.y,l9_14.z,out.sc_RayTracingPositionAndMask.w);
out.sc_RayTracingPositionAndMask.w=(*sc_set0.UserUniforms).sc_RayTracingReceiverMask;
float3 l9_15=l9_11;
float l9_16=dot(abs(l9_15),float3(1.0));
l9_15/=float3(l9_16);
float2 l9_17=float2(fast::clamp(-l9_15.z,0.0,1.0));
float2 l9_18=l9_15.xy+mix(-l9_17,l9_17,step(float2(0.0),l9_15.xy));
uint l9_19=as_type<uint>(half2(l9_18));
uint2 l9_20=uint2(l9_19&65535u,l9_19>>16u);
out.sc_RayTracingNormalAndMore=uint4(l9_20.x,l9_20.y,out.sc_RayTracingNormalAndMore.z,out.sc_RayTracingNormalAndMore.w);
out.sc_RayTracingNormalAndMore.z=l9_13;
uint l9_21=uint(fast::clamp(l9_12,0.0,1.0)*1000.0);
l9_21 |= (((*sc_set0.UserUniforms).sc_RayTracingReceiverId%32u)<<10u);
out.sc_RayTracingNormalAndMore.w=l9_21;
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
