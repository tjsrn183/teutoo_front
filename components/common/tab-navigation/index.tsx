import { cn } from "@/lib/utils/tailwind.utils";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
} from "react";

interface TabNavigationContextType {
  commonId: string;
  registerTab: (id: string) => void;
  currentTabId: string | undefined;
}

const TabNavigationContext = createContext<TabNavigationContextType | null>(
  null,
);

const useTabNavigationContext = (): TabNavigationContextType => {
  const context = useContext(TabNavigationContext);
  if (!context) {
    throw new Error(
      "TabNavigation compound components cannot be rendered outside the TabNavigation component",
    );
  }
  return context;
};

interface TabNavigationProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

const TabNavigationCompo = forwardRef<
  React.ElementRef<"div">,
  TabNavigationProps
>(({ children, ...props }, ref) => {
  const commonId = useId();
  const tabsRef = React.useRef<string[]>([]);
  const [tabs, setTabs] = React.useState<
    {
      id: string;
      show: boolean;
    }[]
  >([]);

  const registerTab = useCallback((id: string): void => {
    tabsRef.current.push(id);
    setTabs((prev) => [...prev, { id, show: false }]);
  }, []);

  React.useEffect(() => {
    const tabElements = tabsRef.current.map((id) =>
      document.getElementById(id),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setTabs((prev) => {
            return prev.map((item) => {
              if (item.id === entry.target.id) {
                return {
                  id: item.id,
                  show: entry.isIntersecting,
                };
              }
              return {
                id: item.id,
                show: item.show,
              };
            });
          });
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-100px 0px 0px 0px",
      },
    );

    // 각 구역을 감시
    tabElements.forEach((section) => {
      if (!section) return;
      observer.observe(section);
    });

    // 컴포넌트 언마운트 시 Observer 해제
    return () => {
      observer.disconnect();
    };
  }, []); // 처음 렌더링 시에만 실행

  const currentTabId = tabs.find((tab) => tab.show)?.id;

  return (
    <TabNavigationContext.Provider
      value={{
        commonId,
        registerTab,
        currentTabId,
      }}
    >
      <div ref={ref} {...props}>
        {children}
      </div>
    </TabNavigationContext.Provider>
  );
});
TabNavigationCompo.displayName = "TabNavigation";

const TabNavigationList = forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "w-full inline-flex items-center bg-white text-neutral-400 shadow-inner shadow-neutral-200 overflow-y-hidden scrollbar-hide",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
TabNavigationList.displayName = "TabNavigationList";

interface TabNavigationTriggerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  value: string;
}

const TabNavigationTrigger = forwardRef<
  React.ElementRef<"button">,
  TabNavigationTriggerProps
>(({ value, className, ...props }, ref) => {
  const { commonId, currentTabId } = useTabNavigationContext();
  const id = `${commonId}-${value}`;
  const isActive = currentTabId === id;
  const handleClick = (): void => {
    const element = document.getElementById(id);
    if (!element) return;
    const elementTop = element.getBoundingClientRect().top - 100;
    scrollBy({
      top: elementTop,
    });
  };
  return (
    <button
      className={cn(
        "relative whitespace-nowrap px-5 text-lg font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-neutral-900 group",
        isActive && "text-neutral-900",
        className,
      )}
      onClick={handleClick}
      ref={ref}
      type="button"
      {...props}
    >
      <div className="py-2 border-b-2 border-transparent group-data-[state=active]:border-black">
        {props.children}
      </div>
    </button>
  );
});
TabNavigationTrigger.displayName = "TabNavigationTrigger";

interface TabNavigationContentProps
  extends React.ComponentPropsWithoutRef<"div"> {
  value: string;
}

const TabNavigationContent = forwardRef<
  React.ElementRef<"div">,
  TabNavigationContentProps
>(({ value, className, ...props }, ref) => {
  const { commonId, registerTab } = useTabNavigationContext();
  React.useEffect(() => {
    registerTab(`${commonId}-${value}`);
  }, [registerTab, commonId, value]);

  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      id={`${commonId}-${value}`}
      ref={ref}
      {...props}
    />
  );
});
TabNavigationContent.displayName = "TabNavigationContent";

const TabNavigation = Object.assign(TabNavigationCompo, {
  List: TabNavigationList,
  Trigger: TabNavigationTrigger,
  Content: TabNavigationContent,
});

export default TabNavigation;
