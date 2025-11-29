# Notification System

EaseSplit now uses a beautiful, animated toast notification system built with Sonner, React, and Tailwind CSS. Features gradient styling, progress bars, and support for success, error, warning, and info notifications.

## 📦 Already Installed

All dependencies are already installed:

- ✅ `sonner` - Toast notification library
- ✅ `clsx` & `tailwind-merge` - Utility libraries
- ✅ `tailwindcss-animate` - Animation support
- ✅ `next-themes` - Theme support (dark/light mode)

## 🚀 Usage

The notification system is already integrated into the app. Simply import and use:

```tsx
import { notifications } from '@/lib/notifications'

// Success notification
notifications.showSuccess({
  title: 'Success!',
  description: 'Operation completed successfully.',
})

// Error notification
notifications.showError({
  title: 'Error',
  description: 'Something went wrong. Please try again.',
})

// Warning notification
notifications.showWarning({
  title: 'Warning',
  description: 'This action cannot be undone.',
})

// Info notification
notifications.showInfo({
  title: 'Info',
  description: 'New features are available!',
})

// Custom duration (default is 2500ms)
notifications.showSuccess({
  title: 'File uploaded',
  description: 'Your file has been uploaded.',
  duration: 6000, // 6 seconds
})

// Promise-based notification (for async operations)
notifications.promise(
  fetch('/api/data'),
  {
    loading: 'Fetching data...',
    success: 'Data loaded successfully!',
    error: 'Failed to load data',
  }
)

// Dismiss all notifications
notifications.dismiss()
```

### Alternative: Direct Toast Usage

You can also use the `showToast` methods directly:

```tsx
import { showToast } from '@/components/ui/toast-sonner'

showToast.success({
  title: 'Success',
  description: 'Operation completed',
})

showToast.error({
  title: 'Error',
  description: 'Something went wrong',
})

showToast.warning({
  title: 'Warning',
  description: 'Please review your input',
})

showToast.info({
  title: 'Info',
  description: 'Here is some information',
})
```

## 🎨 Features

- **Gradient Icons**: Beautiful gradient icons for each notification type
- **Progress Bars**: Animated progress bars showing time remaining
- **Smooth Animations**: Fade in/out and slide animations
- **Theme Support**: Automatic dark/light mode support
- **Customizable Duration**: Set custom display duration
- **Promise Support**: Show loading/success/error states for async operations
- **Auto-dismiss**: Automatically disappear after duration
- **Hover to Pause**: Progress pauses when hovering over notification

## 📝 API Reference

### Notification Manager Methods

#### `showSuccess(notification)`

```tsx
notifications.showSuccess({
  title?: string;        // Default: 'Success'
  description?: string;
  duration?: number;     // Default: 2500ms
})
// Or simply:
notifications.showSuccess('Operation completed!')
```

#### `showError(notification)`

```tsx
notifications.showError({
  title?: string;        // Default: 'Error'
  description: string;   // Required
  duration?: number;     // Default: 2500ms
})
```

#### `showWarning(notification)`

```tsx
notifications.showWarning({
  title?: string;        // Default: 'Warning'
  description?: string;
  duration?: number;     // Default: 2500ms
})
// Or simply:
notifications.showWarning('Be careful!')
```

#### `showInfo(notification)`

```tsx
notifications.showInfo({
  title?: string;        // Default: 'Info'
  description?: string;
  duration?: number;     // Default: 2500ms
})
// Or simply:
notifications.showInfo('New update available')
```

#### `promise(promise, messages, options?)`

```tsx
notifications.promise(
  promise,                // Promise<T>
  {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: any) => string);
  },
  { duration?: number }   // Optional
)
```

#### `dismiss()`

Dismisses all currently visible toasts.

## 🎯 Real-World Examples

### Form Submission

```tsx
const handleSubmit = async (data: FormData) => {
  try {
    await submitForm(data)
    notifications.showSuccess({
      title: 'Form submitted!',
      description: 'Your form has been submitted successfully.',
    })
  } catch (error) {
    notifications.showError({
      title: 'Submission failed',
      description: error.message,
    })
  }
}
```

### File Upload with Promise

```tsx
const handleUpload = async (file: File) => {
  const uploadPromise = uploadFile(file)
  
  notifications.promise(uploadPromise, {
    loading: 'Uploading file...',
    success: (data) => `File uploaded: ${data.filename}`,
    error: (err) => `Upload failed: ${err.message}`,
  })
}
```

### API Call

```tsx
const fetchData = async () => {
  notifications.showInfo('Fetching data...')
  
  try {
    const data = await fetch('/api/data')
    notifications.showSuccess({
      title: 'Data loaded',
      description: `Loaded ${data.length} items`,
    })
  } catch (error) {
    notifications.showError({
      title: 'Failed to load data',
      description: 'Please try again later',
    })
  }
}
```

## 🔧 Customization

### Change Position

Edit `components/ui/sonner.tsx`:

```tsx
<Sonner
  position="bottom-right" // Options: top-left, top-center, top-right, 
                          //          bottom-left, bottom-center, bottom-right
  // ...
/>
```

### Change Default Duration

Edit `components/ui/sonner.tsx`:

```tsx
<Sonner
  duration={5000} // Change from 2500ms to 5000ms
  // ...
/>
```

### Customize Colors

Edit `components/ui/toast-sonner.tsx` in the `toastStyles` object to customize colors, icons, and styling for each notification type.

## 📍 Files Overview

- `components/ui/sonner.tsx` - Toaster component configuration
- `components/ui/toast-sonner.tsx` - Toast message components and styling
- `lib/notifications.ts` - Notification manager (recommended API)

## ✨ Benefits Over Old System

- ✅ More beautiful with gradient designs
- ✅ Animated progress bars
- ✅ Better animations and transitions
- ✅ Simpler API
- ✅ Built-in promise support
- ✅ Automatic theme switching
- ✅ More customizable
- ✅ Better TypeScript support

---

**Note**: The old Radix toast system has been removed. All toast notifications now use the new Sonner-based system.
