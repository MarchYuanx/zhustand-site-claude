/**
 * 图片元数据配置
 *
 * 用于配置图片的详细信息，包括名称、提示词、负向提示词、LoRA 模型等
 *
 * 使用方法：
 * 1. 在这里配置图片的元数据（根据图片文件名匹配）
 * 2. 在 Gallery.jsx 中导入并合并到图片数据中
 *
 * 数据结构：
 * {
 *   'image-filename.png': {
 *     name: '图片名称',
 *     prompt: '正向提示词',
 *     negativePrompt: '负向提示词',
 *     lora: 'LoRA 模型名称'
 *   }
 * }
 */

export const imageMetadata = {
  // 示例配置（请根据实际图片文件名修改）
  'Fleurdelys_1.jpg': {
    name: 'Fleurdelys expressionless',
    prompt: `<lora:xl-ill_fleurdelys(wuthering waves)-v1-000010:0.8>,fleurdelys(wuthering waves),1girl,year 2024,(drop shadow:1.4),(close-up:0.8),(shadow:1.2),(hands up:1.2),(border:1.2),(outside border:1.2),(hand up:1.2),(character name:1.2),upper body,high contrast,frown,looking at viewer,portrait,drop shadow,sparkle,^ ^,flag,cloud,moon,yin yang,star (symbol),cloud,circle,silk,arrow (symbol),thorns web,purple theme,crescent moon,flower,purple theme,colorful,very awa,masterpiece,best quality,newest,highres,absurdres,whale,
(large blue levitating spiked circlet:1.2),Fleurdelys white and black dress,forehead mark with forehead horn,blue long detached train clothes,1girl,long hair,pointy ears,barefoot,jewelry,mature female,leaning_forward,`,
    negativePrompt: 'ng_deepnegative_v1_75t,(badhandv4:1.2),EasyNegative,(worst quality:2),',
    lora: 'xl-ill-芙露德莉斯【鸣潮】'
  },

  'Fleurdelys_2.jpg': {
    name: 'Fleurdelys expressionless',
    prompt: `<lora:xl-ill_fleurdelys(wuthering waves)-v1-000010:0.8>,fleurdelys(wuthering waves),1girl,year 2024,(drop shadow:1.4),(close-up:0.8),(shadow:1.2),(hands up:1.2),(border:1.2),(outside border:1.2),(hand up:1.2),(character name:1.2),upper body,high contrast,frown,looking at viewer,portrait,drop shadow,sparkle,^ ^,flag,cloud,moon,yin yang,star (symbol),cloud,circle,silk,arrow (symbol),thorns web,purple theme,crescent moon,flower,purple theme,colorful,very awa,masterpiece,best quality,newest,highres,absurdres,whale,
(large blue levitating spiked circlet:1.2),Fleurdelys white and black dress,forehead mark with forehead horn,blue long detached train clothes,1girl,long hair,pointy ears,barefoot,jewelry,mature female,leaning_forward,`,
    negativePrompt: 'ng_deepnegative_v1_75t,(badhandv4:1.2),EasyNegative,(worst quality:2),',
    lora: 'xl-ill-芙露德莉斯【鸣潮】'
  },

  'Fleurdelys_3.jpg': {
    name: 'Fleurdelys expressionless',
    prompt: `<lora:xl-ill_fleurdelys(wuthering waves)-v1-000010:0.8>,fleurdelys(wuthering waves),1girl,year 2024,(drop shadow:1.4),(close-up:0.8),(shadow:1.2),(hands up:1.2),(border:1.2),(outside border:1.2),(hand up:1.2),(character name:1.2),upper body,high contrast,frown,looking at viewer,portrait,drop shadow,sparkle,^ ^,flag,cloud,moon,yin yang,star (symbol),cloud,circle,silk,arrow (symbol),thorns web,purple theme,crescent moon,flower,purple theme,colorful,very awa,masterpiece,best quality,newest,highres,absurdres,whale,
(large blue levitating spiked circlet:1.2),Fleurdelys white and black dress,forehead mark with forehead horn,blue long detached train clothes,1girl,long hair,pointy ears,barefoot,jewelry,mature female,leaning_forward,`,
    negativePrompt: 'ng_deepnegative_v1_75t,(badhandv4:1.2),EasyNegative,(worst quality:2),',
    lora: 'xl-ill-芙露德莉斯【鸣潮】'
  },

  'Fleurdelys_4.jpg': {
    name: 'Fleurdelys expressionless',
    prompt: `<lora:xl-ill_fleurdelys(wuthering waves)-v1-000010:0.8>,fleurdelys(wuthering waves),1girl,year 2024,(drop shadow:1.4),(close-up:0.8),(shadow:1.2),(hands up:1.2),(border:1.2),(outside border:1.2),(hand up:1.2),(character name:1.2),upper body,high contrast,frown,looking at viewer,portrait,drop shadow,sparkle,^ ^,flag,cloud,moon,yin yang,star (symbol),cloud,circle,silk,arrow (symbol),thorns web,purple theme,crescent moon,flower,purple theme,colorful,very awa,masterpiece,best quality,newest,highres,absurdres,whale,
(large blue levitating spiked circlet:1.2),Fleurdelys white and black dress,forehead mark with forehead horn,blue long detached train clothes,1girl,long hair,pointy ears,barefoot,jewelry,mature female,leaning_forward,`,
    negativePrompt: 'ng_deepnegative_v1_75t,(badhandv4:1.2),EasyNegative,(worst quality:2),',
    lora: 'xl-ill-芙露德莉斯【鸣潮】'
  },

'Cantarella_1.png': {
    name: 'Cantarella thinking',
    prompt: `<lora:xl-ill_fleurdelys(wuthering waves)-v1-000010:0.8>,Cantarella/(wuthering_waves/),1girl,year 2024,(drop shadow:1.4),(close-up:0.8),(shadow:1.2),(hands up:1.2),(border:1.2),(outside border:1.2),(hand up:1.2),(character name:1.2),from side,closed mouth,upper body,high contrast,frown,rope,portrait,^ ^,flag,limited palette,moon,circle,silk,traffic light,arrow (symbol),purple theme,crescent moon,flower,sunlight,colorful,very awa,masterpiece,best quality,newest,highres,absurdres,
long hair,mature female,jellyfish,disdain,<lora:Cantarella:1>,blue eyes,solo,jewelry,long hair,earrings,bangs,purple hair,hair between eyes,hair ornament,blue hair,facial mark,hair flower,heavy_breathing,stylish_pose,`,
    negativePrompt: `ng_deepnegative_v1_75t,(badhandv4:1.2),EasyNegative,(worst quality:2),`,
    lora: 'XL-ill-【鸣潮丨坎特蕾拉】'
  },

  'Cantarella_2.png': {
    name: 'Cantarella profile',
    prompt: `<lora:xl-ill_fleurdelys(wuthering waves)-v1-000010:0.8>,Cantarella/(wuthering_waves/),1girl,year 2024,(drop shadow:1.4),(close-up:0.8),(shadow:1.2),(hands up:1.2),(border:1.2),(outside border:1.2),(hand up:1.2),(character name:1.2),from side,closed mouth,upper body,high contrast,frown,rope,portrait,^ ^,flag,limited palette,moon,circle,silk,traffic light,arrow (symbol),purple theme,crescent moon,flower,sunlight,colorful,very awa,masterpiece,best quality,newest,highres,absurdres,
long hair,mature female,jellyfish,disdain,<lora:Cantarella:1>,blue eyes,solo,jewelry,long hair,earrings,bangs,purple hair,hair between eyes,hair ornament,blue hair,facial mark,hair flower,heavy_breathing,stylish_pose,`,
    negativePrompt: `ng_deepnegative_v1_75t,(badhandv4:1.2),EasyNegative,(worst quality:2),`,
    lora: 'XL-ill-【鸣潮丨坎特蕾拉】'
  },

  // 添加更多图片配置...
  // 'your-image.png': {
  //   name: '你的图片名称',
  //   prompt: '你的提示词',
  //   negativePrompt: '你的负向提示词',
  //   lora: '你的 LoRA 模型'
  // },
}

/**
 * 获取图片元数据
 * @param {string} filename - 图片文件名
 * @returns {object} 图片元数据对象
 */
export function getImageMetadata(filename: string) {
  return imageMetadata[filename as keyof typeof imageMetadata] || {}
}
