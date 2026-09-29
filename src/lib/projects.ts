export type Project = {
  /** 卡片标题 */
  name: string
  /** 标题下方的一行定位，取各站点自己的 tagline */
  tagline: string
  href: string
  /** 卡片右下角显示的域名/仓库，省掉协议和结尾斜杠 */
  label: string
  /**
   * 站点 logo。各站点自己 public/logo.svg 的副本，放在本站 public/logos/ 下自带一份，
   * 免得首屏要等 8 个跨站请求。改了那边记得同步过来。
   */
  logo: string
  /** 一句话摘要。整页走极简排版，细节留给各站点自己讲 */
  summary: string
  /** 教程的讲数。首屏那行统计要按它加总，别再从 summary 里抠数字 */
  lectures?: number
}

/**
 * 教程之一：成长路径。按岗位铺一条从基本功到生产现场的线，
 * summary 只用一句话点出各自覆盖的技术范围，不重复讲"进度存本地"这个共性。
 */
export const paths: Project[] = [
  {
    name: 'Netpath',
    tagline: '网络运维工程师成长路径',
    href: 'https://netpath.wutz.dev/',
    label: 'netpath.wutz.dev',
    logo: '/logos/netpath.svg',
    summary:
      '从带宽、VLAN、子网这些基本功，一路走到 RDMA、InfiniBand、RoCEv2 无损以太网与 AI 集群的网络拓扑。',
    lectures: 54,
  },
  {
    name: 'Storage Journey',
    tagline: '从零到专业的存储教程',
    href: 'https://storage-journey.wutz.dev/',
    label: 'storage-journey.wutz.dev',
    logo: '/logos/storage-journey.svg',
    summary:
      '从硬盘、文件系统与 I/O 性能分析讲起，经 BPF 观测和 Ceph 生产运维，走到 GPFS 与 AI 训练存储。',
    lectures: 39,
  },
  {
    name: 'K8s Journey',
    tagline: '从零到生产级的 Kubernetes 教程',
    href: 'https://k8s-journey.wutz.dev/',
    label: 'k8s-journey.wutz.dev',
    logo: '/logos/k8s-journey.svg',
    summary:
      '从容器基础、声明式部署，到控制面原理、Kubespray 与 Cilium 生产集群，再到 GPU 调度与大模型推理。',
    lectures: 37,
  },
]

/**
 * 教程之二：从零实现。不铺岗位路线，而是跟着从头造一个能跑起来的系统，
 * 所以 summary 要点明"造的是什么、造到哪一步"。
 */
export const builds: Project[] = [
  {
    name: 'Storforge',
    tagline: '从存储运维到存储研发',
    href: 'https://storforge.wutz.dev/',
    label: 'storforge.wutz.dev',
    logo: '/logos/storforge.svg',
    summary:
      '带着 AI 结对，用 Rust 从零造一个类 Weka NeuralMesh 的分布式存储，终点是能 mount 到 Linux 上跑编译。',
    lectures: 29,
  },
  {
    name: 'RLforge',
    tagline: '单卡 5090 上的强化学习锻造场',
    href: 'https://rlforge.wutz.dev/',
    label: 'rlforge.wutz.dev',
    logo: '/logos/rlforge.svg',
    summary:
      '在一张 32GB 的卡上手写自己的 GRPO，把 Qwen3-0.6B 的数学正确率练上去，再用 TRL 复现做对照。',
    lectures: 27,
  },
  {
    name: 'Agentpath',
    tagline: '借 Pi 造一个 agent',
    href: 'https://agentpath.wutz.dev/',
    label: 'agentpath.wutz.dev',
    logo: '/logos/agentpath.svg',
    summary:
      '从八十行的 agent loop 写起，经工具设计、上下文预算、扩展与权限沙箱、评测与成本，最后拼出自己的 harness。',
    lectures: 31,
  },
]

/** 两类教程合起来的全集，统计和"还有没有别的"这类问题都问它 */
export const tutorials: Project[] = [...paths, ...builds]

export const tools: Project[] = [
  {
    name: 'Storplan',
    tagline: '存储容量和性能规划工具',
    href: 'https://storplan.wutz.dev/',
    label: 'storplan.wutz.dev',
    logo: '/logos/storplan.svg',
    summary:
      '填入目标容量和读写带宽，直接算出六种商业与开源方案的硬件配置和纠删码策略，附一份选型对照。',
  },
  {
    name: 'mmapi',
    tagline: 'GPFS 多租户 API 代理',
    href: 'https://github.com/wutz/mmapi',
    label: 'github.com/wutz/mmapi',
    logo: '/logos/mmapi.svg',
    summary:
      '挡在 GPFS GUI REST API 前面的反向代理，把每个 token 的权限限制到租户和文件系统粒度。',
  },
  {
    name: 'Password',
    tagline: '安全密码生成器',
    href: 'https://password.wutz.dev/',
    label: 'password.wutz.dev',
    logo: '/logos/password.svg',
    summary:
      '浏览器内用 window.crypto 生成强随机密码，可排除易混字符，带强度指示和一键复制。',
  },
]

/**
 * 页面分段。极简排版下每段只留一个 mono eyebrow，不再配 display 标题和引子；
 * 教程拆成两段之后光看 paths/builds 认不出差别，所以额外给一句中文的 note。
 */
export const sections: { eyebrow: string; note?: string; projects: Project[] }[] = [
  { eyebrow: 'paths', note: '按岗位铺的成长路线', projects: paths },
  { eyebrow: 'builds', note: '跟着从零造一个系统', projects: builds },
  { eyebrow: 'tools', projects: tools },
]

/** 首屏统计只认数据源，避免文案里的数字和卡片对不上 */
export const stats = {
  tutorials: tutorials.length,
  lectures: tutorials.reduce((sum, project) => sum + (project.lectures ?? 0), 0),
  tools: tools.length,
}
