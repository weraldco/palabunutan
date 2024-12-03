import AddNewUserForm from '@/components/AddNewUser';

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-3xl font-bold">Home</h1>
			<AddNewUserForm />
		</div>
	);
}
