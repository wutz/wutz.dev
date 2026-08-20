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
   * 免得首屏要等 7 个跨站请求。改了那边记得同步过来。
   */
  logo: string
  summary: string
  tags: string[]
}

/**
 * 教程站点。都是"按岗位分路线 + 进度存本地浏览器"的同一套形态，
 * 所以 summary 只写各自覆盖的技术范围，不重复讲这个共性。
 */
export const tutorials: Project[] = [
  {
    name: 'Netpath',
    tagline: '网络运维工程师成长路径',
    href: 'https://netpath.wutz.dev/',
    label: 'netpath.wutz.dev',
    logo: '/logos/netpath.svg',
    summary:
      '54 讲、六个阶段。从带宽/时延/PPS、ARP、VLAN、子网这些基本功，走到 RDMA、PCIe、NVLink、InfiniBand、RoCEv2 无损以太网，再到 Fat-Tree 与 rail-optimized 拓扑、Spine-Leaf 端口与布线规划、K8s 容器网络、GPUDirect 与 NVMe-oF。',
    tags: ['网络', 'RDMA', 'InfiniBand', 'RoCEv2', 'K8s 网络'],
  },
  {
    name: 'Storpath',
    tagline: '存储工程师成长路径',
    href: 'https://storpath.wutz.dev/',
    label: 'storpath.wutz.dev',
    logo: '/logos/storpath.svg',
    summary:
      '36 讲。块/文件/对象的语义差异、协议、副本与纠删码的取舍、硬件与磁盘 I/O、容量与性能规划，再到 Ceph 架构与 Day-2 运维、GPFS / Storage Scale、K8s 存储（PV/PVC/SC/CSI）以及 Weka、VastData、XSKY 等商业方案。',
    tags: ['存储', 'Ceph', 'GPFS', '纠删码', 'CSI'],
  },
  {
    name: 'Kubepath',
    tagline: 'K8s 工程师成长路径',
    href: 'https://kubepath.wutz.dev/',
    label: 'kubepath.wutz.dev',
    logo: '/logos/kubepath.svg',
    summary:
      '36 讲。控制面原理与 kubectl apply 全流程、声明式控制器、工作负载对象、Pod/Service/DNS 网络模型、集群选型与容量规划、etcd 磁盘验证、Cilium 与 eBPF、CSI、GPU Operator 与设备插件、AI 负载调度（Volcano / Kueue / gang scheduling）、RBAC 与虚拟集群多租户。',
    tags: ['Kubernetes', 'Cilium', 'GPU', '调度', '多租户'],
  },
  {
    name: 'RLforge',
    tagline: '单卡 5090 上的强化学习锻造场',
    href: 'https://rlforge.wutz.dev/',
    label: 'rlforge.wutz.dev',
    logo: '/logos/rlforge.svg',
    summary:
      '27 讲，终点是在一张 32GB 卡上手写自己的 GRPO，把 Qwen3-0.6B 的数学正确率练上去，再用 TRL 复现同一件事做对照。路上覆盖 Blackwell（sm_120）环境与工具链、显存预算、vLLM 推理、PPO → GRPO 原理、rollout 与 reward 的代码、GRPO loss 内部细节、训练曲线怎么读、以及各种翻车现场的排查。',
    tags: ['强化学习', 'GRPO', 'vLLM', 'LLM 训练'],
  },
]

export const tools: Project[] = [
  {
    name: 'Storplan',
    tagline: '存储容量和性能规划工具',
    href: 'https://storplan.wutz.dev/',
    label: 'storplan.wutz.dev',
    logo: '/logos/storplan.svg',
    summary:
      '填入目标容量和读写带宽，直接算出六种方案的硬件配置与纠删码策略：VastData 统一存储、GPFS/Scale、Weka、XSKY XEOS 对象存储，以及 Ceph 的全闪统一存储和混闪对象存储。另附一份选型对照，把高性能文件、对象、块存储各自的优缺点和适用场景摊开来比。',
    tags: ['容量规划', '性能规划', '纠删码', 'Ceph', 'Weka'],
  },
  {
    name: 'mmapi',
    tagline: 'GPFS 多租户 API 代理',
    href: 'https://github.com/wutz/mmapi',
    label: 'github.com/wutz/mmapi',
    logo: '/logos/mmapi.svg',
    summary:
      '挡在 IBM Storage Scale（GPFS）GUI REST API 前面的纯反向代理：转发 /scalemgmt/v2/ 请求，用自己的 token 鉴权，并把每个 token 限制在它声明的文件系统范围内。自身不实现任何 GPFS 逻辑，配套 mmctl CLI 的子命令对齐熟悉的 mm* 系列，让 GPFS CSI 这类组件拿到按租户、按文件系统的最小权限。',
    tags: ['Go', 'GPFS', 'CSI', '反向代理'],
  },
  {
    name: 'Password',
    tagline: 'Secure Password Generator',
    href: 'https://password.wutz.dev/',
    label: 'password.wutz.dev',
    logo: '/logos/password.svg',
    summary:
      '浏览器内生成强随机密码，随机数来自 window.crypto。长度最长 128 位，大小写/数字/符号可分别开关，可排除 i、l、1、L、o、0、O 这类易混字符，带强度指示和一键复制，支持深浅色与五种界面语言。',
    tags: ['密码', 'WebCrypto', '纯前端'],
  },
]
