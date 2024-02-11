import { Posts } from '../components/posts/Posts.jsx'

export const Home = () => {
  return <>
    <div>

      {/* <form className="flex flex-col">
      <label
        className="hover-animation grid w-full grid-cols-[auto,1fr] gap-3 px-4 py-3 border-b-2 border-light-border dark:border-dark-border"
        htmlFor=":rod:"
      >
        <a className="blur-picture flex self-start">
          <figure style={{ width: '48px' }}>
            <span
              style={{
                boxSizing: 'border-box',
                display: 'block',
                overflow: 'hidden',
                width: 'initial',
                height: 'initial',
                background: 'none',
                opacity: '1',
                border: '0px',
                margin: '0px',
                padding: '0px',
                position: 'relative',
              }}
            >
              <span
                style={{
                  boxSizing: 'border-box',
                  display: 'block',
                  width: 'initial',
                  height: 'initial',
                  background: 'none',
                  opacity: '1',
                  border: '0px',
                  margin: '0px',
                  padding: '100% 0px 0px',
                }}
              ></span>
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                data-nimg="responsive"
                className="rounded-full object-cover"
                style={{
                  position: 'absolute',
                  inset: '0px',
                  boxSizing: 'border-box',
                  padding: '0px',
                  border: 'none',
                  margin: 'auto',
                  display: 'block',
                  width: '0px',
                  height: '0px',
                  minWidth: '100%',
                  maxWidth: '100%',
                  minHeight: '100%',
                  maxHeight: '100%',
                }}
              ></img>
            </span>
          </figure>
        </a>
        <div className="flex w-full flex-col gap-4">
          <div className="flex min-h-[48px] w-full flex-col justify-center gap-4">
            <div className="flex flex-col gap-6">
              <button
                type="button"
                className="custom-button accent-tab accent-bg-tab flex cursor-not-allowed items-center gap-1 self-start border border-light-line-reply py-0 px-3 text-main-accent hover:bg-main-accent/10 active:bg-main-accent/20 dark:border-light-secondary"
                data-projection-id="218"
                style={{ opacity: 1, transform: 'none' }}
              >
                <p className="font-bold">Everyone</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4"
                >
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                </svg>
              </button>
              <div className="flex items-center gap-3">
                <textarea
                  id=":rod:"
                  className="w-full min-w-0 resize-none bg-transparent text-xl outline-none placeholder:text-light-secondary dark:placeholder:text-dark-secondary"
                  placeholder="What's happening?"
                  style={{ height: '28px !important' }}
                ></textarea>
              </div>
            </div>
            <div className="flex border-b border-light-border pb-2 dark:border-dark-border" data-projection-id="219" style={{ opacity: 1, transform: 'none' }}>
              <button
                type="button"
                className="custom-button accent-tab accent-bg-tab flex cursor-not-allowed items-center gap-1 py-0 px-3 text-main-accent hover:bg-main-accent/10 active:bg-main-accent/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4"
                >
                  <path d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"></path>
                </svg>
                <p className="font-bold">Everyone can reply</p>
              </button>
            </div>
          </div>
          <div className="flex justify-between" data-projection-id="120" style={{ opacity: 1 }}>
            <div className="flex text-main-accent xs:[&>button:nth-child(n+6)]:hidden md:[&>button]:!block [&>button:nth-child(n+4)]:hidden">
              <input className="hidden" type="file" accept="image/*" multiple />
              <button
                className="custom-button main-tab accent-tab accent-bg-tab group relative rounded-full p-2 hover:bg-main-accent/10 active:bg-main-accent/20"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
                </svg>
                <div className="invisible absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#666666] px-1 py-0.5 text-xs text-white opacity-0 [transition:visibility_0ms_ease_200ms,opacity_200ms_ease] dark:bg-[#495A69] group-hover:visible group-hover:opacity-100 group-hover:delay-500 group-focus-visible:visible group-focus-visible:opacity-100 translate-y-3">
                  <span>Media</span>
                </div>
              </button>
            </div>
            <div className="flex items-center gap-4">

              <button
                className="custom-button main-tab accent-tab bg-main-accent px-4 py-1.5 font-bold text-white enabled:hover:bg-main-accent/90 enabled:active:bg-main-accent/75"
                type="submit"
                disabled
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      </label>
    </form> */}

    <Posts />


      
    </div>
  </>;
};
