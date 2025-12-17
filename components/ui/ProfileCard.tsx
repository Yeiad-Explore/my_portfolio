'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  title: string;
  handle: string;
  status?: string;
  contactText?: string;
  avatarUrl: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  onContactClick?: () => void;
}

const ProfileCard = ({
  name,
  title,
  handle,
  status = 'Available',
  contactText = 'Contact Me',
  avatarUrl,
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick
}: ProfileCardProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || (!enableMobileTilt && window.innerWidth < 768)) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 10;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      className="relative w-full max-w-sm mx-auto perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative bg-card rounded-2xl p-8 shadow-xl transition-all duration-300 ease-out border border-border hover:border-ring"
        style={{
          transform: enableTilt
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`
            : undefined,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative z-10">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/20 ring-offset-4 ring-offset-background">
                <img
                  src={avatarUrl}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              {status && (
                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  {status}
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          {showUserInfo && (
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-1">{name}</h3>
              <p className="text-lg text-primary font-medium mb-2">{title}</p>
              <p className="text-sm text-muted-foreground">@{handle}</p>
            </div>
          )}

          {/* Contact Button */}
          <button
            onClick={onContactClick}
            className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Mail className="w-5 h-5" />
            {contactText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
