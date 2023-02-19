
export const transitionsModalProfile ={
  entering: {
    opacity: 0,
    display: 'block',
    top: '2%',
  },
  entered: {
    opacity: 1,
    display: 'block',
    top: '5%',
  },
exiting: {
    opacity: 0,
    display: 'block',
    top: '2%',
  }, 
  exited: {
    opacity: 0,
    display: 'none',
    top: '5%',
  }
};


export const transitionsModalProfileShadow ={
  entering: {
    opacity: 0,
    display: 'block',
  },
  entered: {
    opacity: 1,
    display: 'block',
  },
exiting: {
    opacity: 0,
    display: 'block',
  }, 
  exited: {
    opacity: 0,
    display: 'none',
  }
};


export const transitionsCategory = {
  entering: {
    display: 'block'
  },
  entered: {
    opacity: 1,
    display: 'block'
  },
exiting: {
    opacity: 0.6,
    display: 'block'
  }, 
  exited: {
    opacity: '0',
    display: 'none'
  }
};

export const transitionsTopButton = {
  entering: {
    display: 'block'
  },
  entered: {
    opacity: 1,
    display: 'block'
  },
exiting: {
    opacity: 0.3,
    display: 'block'
  }, 
  exited: {
    opacity: 0,
    display: 'none'
  }
};
export const transitionsModal = {
  entering: {
    display: 'block',
    position: 'fixed',
    left: '50%',
    bottom: '0',
  },
  entered: {
    opacity: 1,
    display: 'block',
    position: 'fixed',
    left: '50%',
    bottom: '15%',

  },
  exiting: {
    opacity: 0,
    display: 'block',
    position: 'fixed',
    left: '50%',
    bottom: '15%',

  },
  exited: {
    opacity: '0',
    display: 'none',
    bottom: '15%',
  }
};