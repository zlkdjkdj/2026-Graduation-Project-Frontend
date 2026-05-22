import {
  Book,
  Dumbbell,
  Users,
  Settings,
  Sun,
  Moon,
  Upload,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Check,
  Pencil,
  ExternalLink,
  TrendingUp,
  AlertCircle,
  Target,
  PlayCircle,
  Coffee,
  Plus,
  Save,
  Trash2,
  ArrowUp,
  ArrowDown,
  Activity,
  Calendar,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  MessageSquare,
  ThumbsUp,
  Trophy,
  Search,
  Bike,
  Motorbike,
  Car,
  Helicopter,
  Plane,
  Rocket,
  ChevronDown,
  Menu,
  Layers,
  Smartphone,
  Bell
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';

export interface IconProps extends Omit<LucideProps, 'size'> {
  size?: number | string;
}

// Map Lucide icons with default props corresponding to the original ones
export const BookIcon = ({ size = 18, ...props }: IconProps) => <Book size={size} {...props} />;
export const DumbbellIcon = ({ size = 18, ...props }: IconProps) => <Dumbbell size={size} {...props} />;
export const UsersIcon = ({ size = 18, ...props }: IconProps) => <Users size={size} {...props} />;
export const SettingsIcon = ({ size = 18, ...props }: IconProps) => <Settings size={size} {...props} />;
export const SunIcon = ({ size = 18, ...props }: IconProps) => <Sun size={size} {...props} />;
export const MoonIcon = ({ size = 18, ...props }: IconProps) => <Moon size={size} {...props} />;
export const UploadIcon = ({ size = 24, ...props }: IconProps) => <Upload size={size} {...props} />;
export const SparklesIcon = ({ size = 18, ...props }: IconProps) => <Sparkles size={size} {...props} />;
export const PlayIcon = ({ size = 20, fill = 'currentColor', ...props }: IconProps) => <Play size={size} fill={fill} {...props} />;
export const PauseIcon = ({ size = 20, fill = 'currentColor', ...props }: IconProps) => <Pause size={size} fill={fill} {...props} />;
export const ResetIcon = ({ size = 18, ...props }: IconProps) => <RotateCcw size={size} {...props} />;
export const CheckIcon = ({ size = 12, ...props }: IconProps) => <Check size={size} {...props} />;
export const EditIcon = ({ size = 14, ...props }: IconProps) => <Pencil size={size} {...props} />;
export const ExternalLinkIcon = ({ size = 14, ...props }: IconProps) => <ExternalLink size={size} {...props} />;
export const TrendIcon = ({ size = 16, ...props }: IconProps) => <TrendingUp size={size} {...props} />;
export const AlertIcon = ({ size = 16, ...props }: IconProps) => <AlertCircle size={size} {...props} />;
export const TargetIcon = ({ size = 16, ...props }: IconProps) => <Target size={size} {...props} />;
export const PlayCircleIcon = ({ size = 24, ...props }: IconProps) => <PlayCircle size={size} {...props} />;
export const CoffeeIcon = ({ size = 16, ...props }: IconProps) => <Coffee size={size} {...props} />;
export const PlusIcon = ({ size = 20, ...props }: IconProps) => <Plus size={size} {...props} />;
export const SaveIcon = ({ size = 16, ...props }: IconProps) => <Save size={size} {...props} />;
export const TrashIcon = ({ size = 14, ...props }: IconProps) => <Trash2 size={size} {...props} />;
export const ArrowUpIcon = ({ size = 14, ...props }: IconProps) => <ArrowUp size={size} {...props} />;
export const ArrowDownIcon = ({ size = 14, ...props }: IconProps) => <ArrowDown size={size} {...props} />;
export const ActivityIcon = ({ size = 18, ...props }: IconProps) => <Activity size={size} {...props} />;
export const CalendarIcon = ({ size = 18, ...props }: IconProps) => <Calendar size={size} {...props} />;
export const StarIcon = ({ size = 18, ...props }: IconProps) => <Star size={size} {...props} />;
export const ClockIcon = ({ size = 18, ...props }: IconProps) => <Clock size={size} {...props} />;
export const ChevronLeftIcon = ({ size = 18, ...props }: IconProps) => <ChevronLeft size={size} {...props} />;
export const ChevronRightIcon = ({ size = 18, ...props }: IconProps) => <ChevronRight size={size} {...props} />;
export const XIcon = ({ size = 18, ...props }: IconProps) => <X size={size} {...props} />;
export const MessageSquareIcon = ({ size = 14, ...props }: IconProps) => <MessageSquare size={size} {...props} />;
export const ThumbsUpIcon = ({ size = 14, ...props }: IconProps) => <ThumbsUp size={size} {...props} />;
export const TrophyIcon = ({ size = 20, ...props }: IconProps) => <Trophy size={size} {...props} />;
export const SearchIcon = ({ size = 16, ...props }: IconProps) => <Search size={size} {...props} />;

// Reward Icons
export const BicycleIcon = ({ size = 24, ...props }: IconProps) => <Bike size={size} {...props} />;
export const MotorcycleIcon = ({ size = 24, ...props }: IconProps) => <Motorbike size={size} {...props} />;
export const CarIcon = ({ size = 24, ...props }: IconProps) => <Car size={size} {...props} />;
export const HelicopterIcon = ({ size = 24, ...props }: IconProps) => <Helicopter size={size} {...props} />;
export const PlaneIcon = ({ size = 24, ...props }: IconProps) => <Plane size={size} {...props} />;
export const RocketIcon = ({ size = 24, ...props }: IconProps) => <Rocket size={size} {...props} />;

// Additional Navigation / Layout UI Icons
export const ChevronDownIcon = ({ size = 18, ...props }: IconProps) => <ChevronDown size={size} {...props} />;
export const MenuIcon = ({ size = 18, ...props }: IconProps) => <Menu size={size} {...props} />;
export const LayersIcon = ({ size = 18, ...props }: IconProps) => <Layers size={size} {...props} />;
export const SmartphoneIcon = ({ size = 18, ...props }: IconProps) => <Smartphone size={size} {...props} />;
export const BellIcon = ({ size = 18, ...props }: IconProps) => <Bell size={size} {...props} />;

// ------------------------------------------------------------------
//  BadgeIcon – Placeholder (using SparklesIcon)
// ------------------------------------------------------------------
export const BadgeIcon = ({ level: _level, size = 32 }: { level: string; size?: number }) => {
  return (
    <div 
      className="rounded-lg flex items-center justify-center bg-gray-100 dark:bg-[#1a1a1a] text-gray-400"
      style={{ width: size, height: size }}
    >
      <SparklesIcon size={size ? Number(size) * 0.6 : 20} />
    </div>
  );
};

// ------------------------------------------------------------------
//  RewardIcon – Placeholder (using TrophyIcon)
// ------------------------------------------------------------------
export const RewardIcon = ({ index: _index, size = 40 }: { index: number; size?: number }) => {
  return (
    <div 
      className="rounded-xl flex items-center justify-center bg-gray-50 dark:bg-[#111] text-indigo-500"
      style={{ width: size, height: size }}
    >
      <TrophyIcon size={size ? Number(size) * 0.6 : 24} />
    </div>
  );
};
