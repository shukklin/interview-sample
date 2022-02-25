export class FormDataUtil {
	public static getFileFormData(name: string, file: File): FormData {
		const formData = new FormData();

		formData.append(name, file);

		return formData;
	}
}
