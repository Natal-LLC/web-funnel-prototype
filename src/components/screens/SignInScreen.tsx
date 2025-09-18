'use client';

import { MobileLayout, MobileButton } from '@/components/ui/MobileLayout';

export function SignInScreen() {
  const handleDownload = (platform: 'ios' | 'android') => {
    if (platform === 'ios') {
      // iOS App Store link
      window.open('https://apps.apple.com/us/app/natal-pregnancy-postpartum/id6596773195', '_blank');
    } else {
      // Google Play Store link
      window.open('https://play.google.com/store/apps/details?id=com.natalllc.prod&hl=en_US', '_blank');
    }
  };

  return (
    <MobileLayout>
      <div className="text-center flex flex-col h-full">
        {/* Header */}
        <div className="flex-1 flex flex-col justify-center items-center px-4 py-4">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Welcome Back
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Download the NATAL app to continue your fitness journey
          </p>

          {/* App Download Options */}
          <div className="w-full max-w-xs space-y-4">
            {/* iOS Download */}
            <div className="mobile-card p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-foreground rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-background" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Download for iOS
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get the full NATAL experience on your iPhone
              </p>
              <MobileButton 
                size="lg"
                onClick={() => handleDownload('ios')}
                className="w-full"
              >
                Download from App Store
              </MobileButton>
            </div>

            {/* Android Download */}
            <div className="mobile-card p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-primary rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.7049 13.8533 8.0015 12 8.0015c-1.8533 0-3.5902.7034-4.9137 1.4049L5.064 5.9034a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6887 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6887-7.5743-6.1185-9.4396"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Download for Android
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get the full NATAL experience on your Android device
              </p>
              <MobileButton 
                size="lg"
                onClick={() => handleDownload('android')}
                className="w-full"
              >
                Download from Google Play
              </MobileButton>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="px-4 pb-6 pt-4">
          <MobileButton 
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Back to Home
          </MobileButton>
        </div>
      </div>
    </MobileLayout>
  );
}
