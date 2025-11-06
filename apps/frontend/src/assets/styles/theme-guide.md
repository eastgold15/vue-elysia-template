# 🎨 卖鞋网站专用主题系统使用指南


@theme {
  /* ========= 品牌色 ========= */
  /* 主色 */
  --primary: oklch(0.6983 0.1637 49.72);
  /*中级色*/
  --secondary: oklch(0.6983 0.1637 49.72);
  /*第三*/
  --tertiary: oklch(0.6983 0.1637 49.72);
  /*第四*/
  --quaternary: oklch(0.6983 0.1637 49.72);

  /* ========= 功能语义色 ========= */
  --success: oklch(0.75 0.1 135);
  --warning: oklch(0.85 0.2 90);
  --danger: oklch(0.65 0.3 0);
  --info: oklch(0.7 0.2 240);

  /* ========= 中性色 - 文本 ========= */
  /* ========== 亮色模式 ========== */
  --neutral: oklch(0.15 0.005 300);
  /* 主文本：深灰，非纯黑（更柔和） */
  --neutral-muted: oklch(0.4 0.008 300);
  /* 次要文本 */
  --neutral-subtle: oklch(0.55 0.01 300);
  /* 辅助/禁用文本 */
  --inverse: oklch(0.98 0.005 300);
  /* 反色文本（用于深色背景）*/

  /* ========= 表面色 - 背景 ========= */
  /* ========== 亮色模式：背景与表面 ========== */
  --background: oklch(1 0 300);
  /* 页面背景：纯白 */
  --surface: oklch(0.98 0.005 300);
  /* 卡片/模块背景 */
  --surface-hover: oklch(0.96 0.006 300);
  /* 悬停状态（略暗） */
  --surface-active: oklch(0.94 0.007 300);
  /* 激活/按下状态 */
  --overlay: oklch(0 0 0 / 0.6);
  /* 遮罩层（半透明黑） */
  --backdrop: oklch(0 0 0 / 0.4);
  /* 模态背景模糊层（更透明） */

  /* ========= 边框 ========= */
  --border: oklch(0.98 0.005 300);
  --border-muted: oklch(0.98 0.005 300);
  --border-focus: oklch(0.98 0.005 300);

  /* ========= 状态色 ========= */
  /* Hover：向白色混合 15% → 提亮 */
  --color-primary-hover: color-mix(in oklch, var(--color-primary) 85%, white 15%);

  /* Active：向黑色混合 10% → 压暗 */
  --color-primary-active: color-mix(in oklch, var(--color-primary) 90%, black 10%);
  --secondary-hover: var(--secondary-hover);
  --secondary-active: var(--secondary-active);
}


## 🚀 主题特色

### 品牌色彩 - 运动时尚风格
- **主色 (Primary)**: 深红色 `oklch(0.25 0.18 20)` - 品牌核心色，适合主要按钮和重要元素
- **次色 (Secondary)**: 橙红色 `oklch(0.35 0.16 30)` - 强调色，适合次要按钮和装饰元素
- **深色模式**: 主色变为更亮的红色，次色变为更亮的橙色，保持视觉冲击力

### 产品状态专用色
- **新品 (New Arrival)**: 紫红色 - 突出最新款式
- **热销 (Best Seller)**: 绿色 - 标识畅销产品
- **限量 (Limited Edition)**: 金色 - 强调稀缺性
- **促销 (On Sale)**: 橙红色 - 吸引注意力

## 📝 使用方式

### 1. 基础语义化类名

```html
<!-- 背景色 -->
<div class="bg-background">页面背景</div>
<div class="bg-surface">卡片背景</div>

<!-- 文字颜色 -->
<h1 class="text-neutral">主要文字</h1>
<p class="text-neutral-muted">次要文字</p>
<span class="text-neutral-subtle">辅助文字</span>
<span class="text-inverse">反色文字</span>

<!-- 按钮样式 -->
<button class="bg-primary text-inverse">主要按钮</button>
<button class="bg-secondary text-inverse">次要按钮</button>
<button class="bg-primary hover:bg-primary-hover">带悬停效果</button>
```

### 2. 产品状态标签

```html
<!-- 直接使用变量 -->
<span class="px-2 py-1 text-xs font-medium" style="background-color: var(--new-arrival); color: white;">新品</span>
<span class="px-2 py-1 text-xs font-medium" style="background-color: var(--best-seller); color: white;">热销</span>
<span class="px-2 py-1 text-xs font-medium" style="background-color: var(--limited-edition); color: white;">限量</span>
<span class="px-2 py-1 text-xs font-medium" style="background-color: var(--on-sale); color: white;">促销</span>
```

### 3. 渐变背景

```html
<!-- 品牌渐变 -->
<div class="w-full h-32" style="background: var(--gradient-brand);"></div>

<!-- 英雄区域渐变 -->
<section class="hero-section" style="background: var(--gradient-hero);">
  <h1 class="text-neutral text-4xl font-bold">运动鞋系列</h1>
</section>
```

### 4. 阴影效果

```html
<!-- 卡片阴影 -->
<div class="bg-surface p-6 rounded-lg" style="box-shadow: var(--shadow-md);">
  <h2 class="text-neutral">产品标题</h2>
  <p class="text-neutral-muted">产品描述</p>
</div>

<!-- 悬停效果 -->
<div class="bg-surface p-6 rounded-lg hover:shadow-lg transition-shadow"
     style="box-shadow: var(--shadow-sm);"
     onmouseover="this.style.boxShadow='var(--shadow-lg)'"
     onmouseout="this.style.boxShadow='var(--shadow-sm)'">
  产品卡片
</div>
```

## 🌓 深色模式

### 主题对比
- **浅色模式**: 白色背景 + 深色文字，适合白天使用
- **深色模式**: 适中深灰背景 + 亮色文字，适合夜间使用

### 自动适配
所有使用语义化类名的元素都会自动适配：
- `text-neutral` 在亮色模式下是深色，暗色模式下是亮白色
- `bg-surface` 在亮色模式下是淡灰，暗色模式下是适中深灰
- `bg-background` 在亮色模式下是纯白，暗色模式下是适中深灰

### 暗色模式特殊效果
```html
<!-- 暗色模式下使用不同的产品状态色 -->
<span class="dark:hidden" style="background-color: var(--new-arrival);">新品</span>
<span class="hidden dark:inline" style="background-color: var(--dark-new-arrival);">新品</span>
```

## 🎯 最佳实践

### 1. 层次化使用颜色
```html
<!-- 好的实践 -->
<article class="bg-surface p-6 border border-border rounded-lg">
  <h2 class="text-neutral text-xl font-bold mb-2">产品标题</h2>
  <p class="text-neutral-muted mb-4">产品描述</p>
  <div class="flex items-center gap-2">
    <span class="text-neutral-subtle text-sm">状态:</span>
    <span class="px-2 py-1 text-xs font-medium bg-success text-inverse">有货</span>
  </div>
  <button class="mt-4 w-full bg-primary text-inverse py-2 hover:bg-primary-hover transition-colors">
    加入购物车
  </button>
</article>
```

### 2. 响应式设计
```html
<!-- 移动端优先的颜色使用 -->
<div class="bg-surface p-4 sm:p-6 lg:p-8">
  <h1 class="text-neutral text-2xl sm:text-3xl lg:text-4xl">响应式标题</h1>
  <p class="text-neutral-muted text-sm sm:text-base">响应式描述</p>
</div>
```

### 3. 交互状态
```html
<!-- 完整的交互状态 -->
<button class="bg-primary text-inverse px-6 py-2 rounded-lg
                   hover:bg-primary-hover
                   active:bg-primary-active
                   focus:outline-none focus:ring-2 focus:ring-border-focus
                   transition-all duration-200">
  交互按钮
</button>
```

## 🔧 主题切换

主题切换已经内置支持，用户可以通过以下方式切换：
- 浅色模式 → 深色模式 → 跟随系统 → 浅色模式

## 📊 色彩对比度

所有颜色都经过精心调整，确保在两种模式下都有良好的对比度：
- **文字对比度**: 符合 WCAG AA 标准
- **按钮对比度**: 确保可访问性
- **状态标识**: 醒目但不刺眼

## 🎪 动画效果

```css
/* 平滑的主题切换动画 */
* {
  transition: background-color 0.3s ease,
              color 0.3s ease,
              border-color 0.3s ease,
              box-shadow 0.3s ease;
}
```

## 🎨 设计灵感

这个主题系统专为运动鞋电商网站设计：
- **红色系**: 体现运动激情和活力
- **深色模式**: 现代感强，适合年轻用户群体
- **高对比度**: 确保产品图片和文字都清晰可见
- **专业配色**: 符合运动品牌视觉规范

---

现在你可以在任何组件中使用这些语义化类名和变量，它们会自动适配亮色和深色模式，为你的卖鞋网站提供专业且时尚的视觉效果！