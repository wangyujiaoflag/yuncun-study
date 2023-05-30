export interface Banner {
  imageUrl: string;
  targetId: number;
  targetType: number;
  typeTitle: string;
  bannerId: number;
}
export interface Personalized {
  id: number;
  type: number;
  name: string;
  copywriter: string;
  picUrl: string;
  canDislike: boolean;
  trackNumberUpdateTime: number;
  playCount: number;
  trackCount: number;
  highQuality: boolean;
  alg: string;
}
