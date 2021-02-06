const errorIcon = `/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/AlertStopIcon.icns`;

function run(argv) {
  const objectId = argv[0].trim();

  const objectIdRegex = /^[a-f\d]{24}$/i;
  if (!objectIdRegex.test(objectId)) {
    const error = {
      uid: 'error',
      title: 'Invalid MongoDB ObjectId',
      arg: null,
      valid: false,
      icon: {
        path: errorIcon,
      },
    };

    return JSON.stringify({
      items: [error],
    });
  }

  const date = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const localDate = date.toLocaleString(undefined, options);

  const items = {
    items: [
      {
        title: date,
        arg: date,
        icon: {
          path: './icon.png',
        },
        mods: {
          cmd: {
            subtitle: 'Copy to clipboard',
          },
        },
      },
      {
        title: localDate,
        arg: date,
        icon: {
          path: './icon.png',
        },
        mods: {
          cmd: {
            subtitle: 'Copy to clipboard',
          },
        },
      },
    ],
  };

  return JSON.stringify(items);
}
