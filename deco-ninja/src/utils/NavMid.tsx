import React from "react";
import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Icon,
	Link,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
	useColorMode,
	Image,
	Input,
	HStack,
	VStack,
	LinkOverlay,
	Switch,
} from "@chakra-ui/react";
import {
	HamburgerIcon,
	CloseIcon,
	ChevronDownIcon,
	ChevronRightIcon,
} from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { VscSearch } from 'react-icons/vsc';
import { AiOutlineShoppingCart, AiOutlineUserDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export default function NavMid() {
	const { isOpen, onToggle } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();
	const imageSize = useBreakpointValue({ base: "50%", md: "50%", lg: "30%" });
	const navigate = useNavigate()
	return (
		<Box maxW={{ base: "100%", md: "90%", lg: "72%" }} mx='auto'>
			<Flex
				bg={useColorModeValue("white", "root.black")}
				color={useColorModeValue("gray.600", "white")}
				minH={"60px"}
				py={{ base: 2 }}
				px={{ base: 4 }}
				align={"center"}>
				<Flex
					// flex={{ base: 1, md: "auto" }}
					// ml={{ base: -2 }}
					display={{ base: "flex", md: "none" }}>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? (
								<CloseIcon w={3} h={3} />
							) : (
								<HamburgerIcon w={5} h={5} />
							)
						}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
					/>
				</Flex>
				<Flex
					flex={{ base: 1 }}>
					<Image
						onClick={() => navigate('/')}
						cursor='pointer'
						mr={{ base: "5rem", md: "0" }}
						srcSet='https://gdurl.com/AkqI 2x, https://gdurl.com/XV3f 3x'
						alt='logo'
						w={imageSize}
					/>
					<Flex display={{ base: "none", md: "flex"}} ml={20}
						align={"center"} justify={"flex-end"} w={{ base: "100%", md: "50%" }}
						mr={{ base: "none", md: "5" }}
					// border='1px solid red'
					>
						{/* <DesktopNav /> */}
						<Input placeholder="Search" type='text'
							bg={useColorModeValue("gray.100", "gray.900")}
							border={0}
							rounded={'none'}
							_placeholder={{
								color: useColorModeValue("gray.500", "gray.400"),
							}}
							px={4}
							py={2}
							color={useColorModeValue("gray.500", "gray.400")}
							_focusVisible={{
								borderColor: "none",
							}}
						/>
						<Button rounded={'none'} bg={useColorModeValue("gray.100", "gray.900")} _hover={{ bg: `{useColorModeValue("gray.100", "gray.900")}` }}>
							<VscSearch size='1.2rem' color='gray.500' />
						</Button>
					</Flex>
				</Flex>

				<Stack
		  		// border='1px solid red'
					mr={{ base: "0", md: "4" }}
					flex={{ base: 1, md: 0 }}
					justify={"flex-end"}
					align={"center"}
					direction={"row"}
					spacing={{ base: 6, md: 8, lg: 14 }}
					// border='1px solid red'
					color={useColorModeValue("root.green", "gray.400")}
				>
					<Switch size='md' onChange={toggleColorMode} 
						w='1rem' mr={{ base: "3", md: "5" }} colorScheme={'green'}></Switch>
					<HStack
						pos={'relative'}
						right='1.4rem'
						display={{ base: "none", md: "flex" }}
						w='60px'
					>
						<Text>Shop</Text>
						<Image src='https://www.dollartree.com/file/general/dt_plus_pdp_plp_200x70.png' w='20' h='6' />
					</HStack>
					<VStack spacing='0'>
						<AiOutlineUserDelete size='1.5rem' />
						<Text fontSize={'xs'}>Account</Text>
					</VStack >
					<VStack spacing='0' mr='1rem'>
						<AiOutlineShoppingCart size='1.5rem' />
						<Text fontSize={'xs'}>Cart</Text>
					</VStack>
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	);
}

const DesktopNav = () => {
	const linkColor = useColorModeValue("gray.600", "gray.200");
	const linkHoverColor = useColorModeValue("gray.800", "white");
	const popoverContentBgColor = useColorModeValue("white", "gray.800");

	return (
		<Stack direction={"row"} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={"hover"} placement={"bottom-start"}>
						<PopoverTrigger>
							<Link
								p={2}
								href={navItem.href ?? "#"}
								fontSize={"sm"}
								fontWeight={500}
								color={linkColor}
								_hover={{
									textDecoration: "none",
									color: linkHoverColor,
								}}>
								{navItem.label}
							</Link>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={"xl"}
								bg={popoverContentBgColor}
								p={4}
								rounded={"xl"}
								minW={"sm"}>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav
											key={child.label}
											{...child}
										/>
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
	return (
		<Link
			href={href}
			role={"group"}
			display={"block"}
			p={2}
			rounded={"md"}
			_hover={{ bg: useColorModeValue("pink.50", "gray.900") }}>
			<Stack direction={"row"} align={"center"}>
				<Box>
					<Text
						transition={"all .3s ease"}
						_groupHover={{ color: "pink.400" }}
						fontWeight={500}>
						{label}
					</Text>
					<Text fontSize={"sm"}>{subLabel}</Text>
				</Box>
				<Flex
					transition={"all .3s ease"}
					transform={"translateX(-10px)"}
					opacity={0}
					_groupHover={{
						opacity: "100%",
						transform: "translateX(0)",
					}}
					justify={"flex-end"}
					align={"center"}
					flex={1}>
					<Icon
						color={"pink.400"}
						w={5}
						h={5}
						as={ChevronRightIcon}
					/>
				</Flex>
			</Stack>
		</Link>
	);
};

const MobileNav = () => {
	return (
		<Stack
			bg={useColorModeValue("white", "root.black")}
			p={4}
			display={{ md: "none" }}>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}
		 
		>
			<Flex
				py={2}
				as={Link}
				href={href ?? "#"}
				justify={"space-between"}
				align={"center"}
				_hover={{
					textDecoration: "none",
				}}>
				<Text
					fontWeight={600}
					color={useColorModeValue("gray.600", "gray.400")}>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={"all .25s ease-in-out"}
						transform={isOpen ? "rotate(180deg)" : ""}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse
				in={isOpen}
				animateOpacity
				style={{ marginTop: "0!important" }}>
				<Stack
					pl={4}
					align={"start"}>
					{children &&
						children.map((child) => (
							<Link key={child.label} py={2} href={child.href} color={useColorModeValue("gray.600", "gray.400")}>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

interface NavItem {
	label: string;
	subLabel?: string;
	children?: Array<NavItem>;
	href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
	{
		label: "All Departments",
		children: [
			{
				label: "Dollar Tree PLUS",
				href: "#",
			},
			{
				label: "Holidays",
				href: "#",
			},
			{
				label: "Kitchen & Dining",
				href: "#",
			},
			{
				label: "Floral & Home Decor",
				href: "#",
			},
			{
				label: "Party Supplies",
				href: "#",
			},
			{
				label: "Food, Candy & Drinks",
				href: "#",
			},
			{
				label: "Office & School Supplies",
				href: "#",
			},
			{
				label: "Health & Beauty Supplies",
				href: "#",
			},
			{
				label: "Toys, Books, Puzzles & Games",
				href: "#",
			},
			{
				label: "Extreme Values & New Arrivals",
				href: "#",
			},
		],
	},
	{
		label: "Holidays, Seasons & Celebrations",
		children: [
			{
				label: "Valentine's Day",
				href: "#",
			},
			{
				label: "St. Patrick's Day",
				href: "#",
			},
			{
				label: "Mardi Gras",
				href: "#",
			},
			{
				label: "Easter Shop",
				href: "#",
			},
			{
				label: "Cinco de Mayo",
				href: "#",
			},
			{
				label: "Patriotic Party ",
				href: "#",
			},
			{
				label: "Supplies ",
				href: "#",
			},
			{
				label: "Halloween Shop ",
				href: "#",
			},
			{
				label: "Day of the Dead ",
				href: "#",
			},
			{
				label: "Hanukkah",
				href: "#",
			},
		],
	},
	{
		label: " Toys & Crafts",
		children: [
			{
				label: "Stuffed Animals & Dolls",
				href: "#",
			},
			{
				label: "Action Figures & Cars",
				href: "#",
			},
			{
				label: "Novelty Toys & Gag Gifts",
				href: "#",
			},
			{
				label: "Active Play",
				href: "#",
			},
			{
				label: "Dress-Up & Pretend Play",
				href: "#",
			},
			{
				label: "Glow-in-the-Dark Toys",
				href: "#",
			},
			{
				label: "Bubbles, Balls & Chalk",
				href: "#",
			},
			{
				label: "Activity Dough, Putty & Slime",
				href: "#",
			},
			{
				label: "Beach & Pool Toys",
				href: "#",
			},
		],
	},
	{
		label: "Kitchen & Home Décor",
		children: [
			{
				label: "Dinnerware",
				href: "#",
			},
			{
				label: "Glasses & Drinkware",
				href: "#",
			},
			{
				label: "Food Storage",
				href: "#",
			},
			{
				label: "Cookware & Bakeware",
				href: "#",
			},
			{
				label: "BBQ Tools & Picnic Supplies",
				href: "#",
			},
			{
				label: "Kitchen Tools & Gadgets",
				href: "#",
			},
			{
				label: "Kitchen & Table Linens",
				href: "#",
			},
			{
				label: "Catering Supplies & Serveware",
				href: "#",
			},
		],
	},
	{
		label: "Home & Office",
		children: [
			{
				label: "Paper Towels & Napkins",
				href: "#",
			},
			{
				label: "Bed & Bath",
				href: "#",
			},
			{
				label: "Auto Care & Maintenance",
				href: "#",
			},
			{
				label: "Home Improvement",
				href: "#",
			},
			{
				label: "Trash Bags",
				href: "#",
			},
			{
				label: "Pet Supplies",
				href: "#",
			},
			{
				label: "Pest Control",
				href: "#",
			},
			{
				label: "Lighters & Matches",
				href: "#",
			},
		],
	},
	{
		label: " Health & Personal Care",
		children: [
			{
				label: "Oral Care",
				href: "#",
			},
			{
				label: "Bath & Body",
				href: "#",
			},
			{
				label: "Deodorants",
				href: "#",
			},
			{
				label: "Razors & Shaving Cream",
				href: "#",
			},
			{
				label: "Hair Care",
				href: "#",
			},
			{
				label: "Makeup & Cosmetics",
				href: "#",
			},
			{
				label: "Cotton Balls & Swabs",
				href: "#",
			},
			{
				label: "Facial Tissues",
				href: "#",
			},
			{
				label: "Skincare",
				href: "#",
			},
		],
	},
	{
		label: " Food, Candy & Drinks",
		children: [
			{
				label: "Food",
				href: "#",
			},
			{
				label: "Drinks",
				href: "#",
			},
			{
				label: "Candy & Gum",
				href: "#",
			},
			{
				label: "Snacks",
				href: "#",
			},
			{
				label: "Care Package Ideas",
				href: "#",
			},
		],
	},
];